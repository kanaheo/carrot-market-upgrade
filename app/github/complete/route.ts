import db from "@/lib/db";
import { getAccessTokenResponse, getUserEmailResponse, getUserProfileResponse, saveSession } from "@/lib/github";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const { error, access_token } = await getAccessTokenResponse(code);

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  // must different user access token
  const { id, avatar_url, login } = await getUserProfileResponse(access_token);

  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await saveSession(user, "profile");
  }

  const email = await getUserEmailResponse(access_token);
  const emailUser = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (emailUser) {
    await saveSession(emailUser, "profile");
  }

  const newUser = await db.user.create({
    data: {
      username: login + "_gh_user",
      email,
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });

  if (newUser) {
    await saveSession(newUser, "profile");
  }
}

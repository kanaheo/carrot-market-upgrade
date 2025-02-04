import { redirect } from "next/navigation";
import getSession from "./session";
import db from "./db";

export async function saveSession(user, returnUrl) {
  const session = await getSession();
  session.id = user.id;
  await session.save();
  return redirect("/" + returnUrl);
}

export async function getAccessTokenResponse(code: string) {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const { error, access_token } = await accessTokenResponse.json();
  return { error, access_token };
}

export async function getUserProfileResponse(access_token: string) {
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const { id, avatar_url, login } = await userProfileResponse.json();
  return { id, avatar_url, login };
}

export async function getUserEmailResponse(access_token: string) {
  const userEmailProfileResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const emailData = await userEmailProfileResponse.json();
  return emailData.find((item) => item.primary).email;
}

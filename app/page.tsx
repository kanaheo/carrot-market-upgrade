export default function Home() {
  return (
    <main className="bg-red-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5">
      <div className="card bg-base-200 w-80">
        <div className="card-body">
          <input placeholder="Email" className="input input-bordered" />
          <label className="label cursor-pointer">
            Accept terms of use
            <input type="checkbox" className="toggle" />
          </label>
          <label className="label cursor-pointer">
            Submit to newsletter
            <input type="checkbox" className="toggle" />
          </label>
          <button className="btn btn-neutral">Save</button>
        </div>
      </div>
    </main>
  );
}

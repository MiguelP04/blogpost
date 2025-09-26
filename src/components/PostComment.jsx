export default function PostComment({ comment }) {
  return (
    <>
      <div className="flex gap-4">
        <img
          src={comment.image}
          alt=""
          className="w-12 h-12 border border-zinc-200 rounded-full"
        />
        <div className="flex flex-col gap-1 bg-zinc-200 px-4 py-3 rounded-md">
          <span className="font-bold text-sm">{comment.email}</span>
          <p className="text-sm">{comment.body}</p>
        </div>
      </div>
    </>
  );
}

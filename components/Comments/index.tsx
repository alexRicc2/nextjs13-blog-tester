import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import s from "./CommentForm.module.css";
import Image from "next/image";
import LineButton from "../ui/LineButton";
import {ConvertDate} from "../../utils/convertDate";
import { v4 as uuidv4 } from "uuid";
const Comments = ({ databaseId, id }: any) => {
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [save, setSave] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loadingSendForm, setLoadingSendForm] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [comments, setComments] = useState<any>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [HasMoreComments, setHasMoreComments] = useState(false);
  const [endCursor, setEndCursor] = useState("");
  useEffect(() => {
    if (Cookies.get("savedInfo")) {
      setName(Cookies.get("name") ?? "");
      setEmail(Cookies.get("email") ?? "");
      setSave(true);
    }
  }, []);

  useEffect(() => {
    fetch(`api/get-comments?postId=${id}&commentsPerPage=${3}&after=${null}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data?.comments?.edges ?? []);
        setCommentCount(data?.commentCount ?? 0);
        setHasMoreComments(data?.comments?.pageInfo?.hasNextPage);
        setEndCursor(data?.comments?.pageInfo?.endCursor);
      });
  }, [id]);

  const handleLoadMore = async () => {
    setLoadingComments(true);
    fetch(
      `api/get-comments?postId=${id}&commentsPerPage=${3}&after=${endCursor}`
    )
      .then((res) => res.json())
      .then((data) => {
        setComments((prevState: any) => [
          ...prevState,
          ...data?.comments?.edges,
        ]);
        setHasMoreComments(data?.comments?.pageInfo?.hasNextPage);
        setEndCursor(data?.comments?.pageInfo?.endCursor);
        setLoadingComments(false);
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingSendForm(true);
    const data = {
      content,
      authorName: name,
      authorEmail: email,
      postDatabaseId: databaseId,
    };
    const newComment = {
      node: {
        author: {
          node: {
            name: name,
          },
        },
        content,
        date: new Date(),
        id: uuidv4(),
      },
    };
    const newComments = [newComment, ...comments];

    try {
      const res = await fetch("/api/postComment", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const resJson = await res.json();
      setLoadingSendForm(false);
      setFeedbackMessage(resJson.message);
      if (!resJson.success) return;
      setContent("");
      setComments(newComments);
      setCommentCount((prev) => prev + 1);

      if (save) {
        Cookies.set("savedInfo", "true");
        Cookies.set("name", name);
        Cookies.set("email", email);
      } else {
        Cookies.remove("savedInfo");
        Cookies.remove("name");
        Cookies.remove("email");
        setEmail("");
        setName("");
      }
    } catch {
      setLoadingSendForm(false);
      setFeedbackMessage(
        "Sorry something went wrong, check your internet or try again later"
      );
    }
  };
  return (
    <>
      <div className={s.formWrapper}>
        <h3 className={s.title}>Leave a reply</h3>

        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.doubleInput}>
            <input
              type="text"
              placeholder="Your name"
              required
              className={s.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={s.input}
              type="email"
              placeholder="Your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Your message"
            required
            rows={4}
            value={content}
            className={s.input}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className={s.checkboxContainer}>
            <input
              type="checkbox"
              id="save"
              checked={save}
              className={s.checkbox}
              onChange={(e) => setSave(e.target.checked)}
            />
            <label htmlFor="save" className={s.label}>
              Save my name and email in this browser for the next time I
              comment.
            </label>
          </div>
          <div>
            <LineButton type="submit" variant="secondary">
              {loadingSendForm ? "Loading.." : "SEND MESSAGE →"}
            </LineButton>
          </div>
        </form>
        <p className={s.feedback}>{feedbackMessage}</p>
      </div>
      {commentCount > 0 && (
        <div className={s.commentList}>
          <h3 className={s.commentCount}>{`(${commentCount}) ${
            commentCount > 1 ? "Comments" : "Comment"
          }`}</h3>
          <div>
            {comments?.map(({ node }: any) => {
              return (
                <div key={node?.id} className={s.commentCard}>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          node?.author?.node?.avatar?.url ?? "/user.png"
                        }
                        className="rounded-full"
                        height={42}
                        width={42}
                        alt=""
                      />
                      <div>{node?.author?.node?.name}</div>
                    </div>
                    <div>{ConvertDate(node?.date)}</div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: node?.content }} className={s.content}/>
                </div>
              );
            })}
          </div>

          {HasMoreComments && (
            <button className={s.loadMore} onClick={handleLoadMore}>
              {!loadingComments ? "Load more comments +" : "Loadin.."}
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default Comments;

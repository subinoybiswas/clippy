"use client";
import { Button, Input, Snippet, Spinner, Textarea } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { GrPowerReset } from "react-icons/gr";
import { useState } from "react";
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [clippyId, setClippyId] = useState("");
  const createClippy = async () => {
    setSubmitted(true);
    setLoading(true);
    const data = await fetch("/api/createClippy", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    const response = await data.json();
    setCode(response.id);
    setLoading(false);
  };
  const getPage = (clippyId: string) => {
    router.push(`/${clippyId}`);
  };
  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center align-middle justify-between p-24 background content-center w-full">
        <div className="flex flex-col  gap-2 items-center w-[95vw] sm:w-1/2 bg-slate-200/50 p-5 rounded-3xl">
          <Input
            type="text"
            label="Clippy ID"
            onChange={(e) => {
              setClippyId(e.target.value);
            }}
          />
          <Button
            color="primary"
            onClick={() => {
              getPage(clippyId);
            }}
          >
            Get
          </Button>
          <Divider className="my-4" />
          <Textarea
            label="Make your Clippy"
            placeholder="Add your Clip"
            labelPlacement="outside"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {loading ? (
            <Spinner />
          ) : submitted ? (
            <Snippet symbol="">{code}</Snippet>
          ) : (
            <Button
              color="primary"
              aria-label="Copy to clipboard"
              onClick={() => createClippy()}
            >
              Create
            </Button>
          )}
          {submitted && (
            <Button
              color="primary"
              aria-label="Reset"
              onClick={() => {
                setText("");
                setCode("");
                setSubmitted(false);
              }}
            >
              <GrPowerReset />
            </Button>
          )}
        </div>
      </main>
    </NextUIProvider>
  );
}

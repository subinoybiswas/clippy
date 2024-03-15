"use client";
import {
  Button,
  Divider,
  Textarea,
  Input,
  NextUIProvider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function GetPage({ clippyId }: { clippyId: string }) {
  const [clippyIds, setClippyId] = useState(clippyId);
  const [content, setContent] = useState("Hello");
  const [loading, setLoading] = useState(true);
  const theId = clippyId;
  const router = useRouter();
  const fetchAndHydrate = async (clippyId: string) => {
    setLoading(true);
    const response = await fetch("/api/getPage", {
      method: "POST",
      body: JSON.stringify({ clippyId }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      setLoading(false);
      router.push("/");
      return;
    }
    const data = await response.json();
    setContent(data.content);
    setLoading(false);
  };
  useEffect(() => {
    fetchAndHydrate(theId);
  }, []);
  
  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center align-middle justify-between p-24 background content-center w-full">
        <div className="flex flex-col  gap-2 items-center w-[95vw] sm:w-1/2 bg-slate-200/50 p-5 rounded-3xl">
          <Input
            type="text"
            label="Clippy ID"
            value={clippyIds}
            onChange={(e) => setClippyId(e.target.value)}
          />
          <Button
            color="primary"
            onClick={() => {
              fetchAndHydrate(clippyIds);
            }}
          >
            Get
          </Button>
          <Divider className="my-4" />
          {loading ? <Spinner /> : <Textarea value={content} />}

          <Button
            isIconOnly
            color="primary"
            aria-label="Copy to clipboard"
            onClick={() => {
              navigator.clipboard.writeText(content);
            }}
          >
            <FaRegCopy></FaRegCopy>
          </Button>
        </div>
      </main>
    </NextUIProvider>
  );
}

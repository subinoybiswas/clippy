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

  const handleClippyIdChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/[^\d]/g, "");

    if (numericInput.length > 6) return;

    const formattedInput =
      numericInput.slice(0, 3) +
      (numericInput.length > 3 ? "-" + numericInput.slice(3) : "");

    const isBackspace = e.nativeEvent.inputType === "deleteContentBackward";
    setClippyId(isBackspace ? numericInput : formattedInput);
  };

  useEffect(() => {
    fetchAndHydrate(theId);
  }, []);

  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center align-middle justify-between p-24 background content-center w-full">
        <div className="flex flex-col  gap-2 items-center w-[95vw] sm:w-1/2 bg-slate-200/50 p-5 rounded-3xl">
          <Button
            className="self-start"
            color="primary"
            onClick={() => {
              router.push("/");
            }}
          >
            Return
          </Button>
          <Input
            type="text"
            label="Clippy ID"
            value={clippyIds}
            onChange={(e) => handleClippyIdChange(e)}
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
          {loading ? <Spinner /> : <Textarea label="Content" value={content} />}

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

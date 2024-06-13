"use client";
import {
  Button,
  Divider,
  Textarea,
  Input,
  NextUIProvider,
  Snippet,
} from "@nextui-org/react";
import { FaRegCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function GetPage({ clippyId }: { clippyId: string }) {
  const [clippyIds, setClippyId] = useState(clippyId);
  const [content, setContent] = useState(null);
  const [url, setUrl] = useState<string | undefined>();
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
    if (data.content && data.content.text) {
      setContent(data.content.text);
    }
    if (data.content && data.content.url) {
      setUrl(data.content.url);
    }

    setLoading(false);
  };

  const handleClippyIdChange = (e: any) => {
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

  const downloadFile = async (ur: string) => {
    try {
      const url = ur; // Replace with the actual URL
      const response = await fetch(url);
      const blob = await response.blob();

      // Extract filename from the URL
      const filename = url.substring(url.lastIndexOf("/") + 1);

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename); // Use extracted filename
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <NextUIProvider>
       
      <main className="flex min-h-screen flex-col items-center align-middle justify-between p-24 background content-center w-full">
        <div className="flex flex-col  gap-2 items-center w-[95vw] sm:w-1/2 bg-slate-200/50 p-5 rounded-3xl">
          <Button
            className="self-start flex flex-row items-center justify-center"
            color="primary"
            onClick={() => {
              router.push("/");
            }}
            
          >
            <FontAwesomeIcon icon={ faArrowLeft} />
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
          {loading ? (
            <Spinner />
          ) : content ? (
            <>
              <Textarea label="Content" value={content} />
              <Button
                isIconOnly
                color="primary"
                aria-label="Copy to clipboard"
                onClick={() => {
                  if (content) {
                    navigator.clipboard.writeText(content);
                  }
                }}
              >
                <FaRegCopy></FaRegCopy>
              </Button>
            </>
          ) : null}
          {url && !loading ? (
            <>
              <Snippet
                symbol=""
                codeString={url}
                tooltipProps={{ color: "secondary" }}
              >
                {url.length >= 20 ? url.slice(0, 20) + "..." : url}
              </Snippet>

              <Button
                color="primary"
                onClick={() => {
                  downloadFile(url);
                }}
              >
                Download File
              </Button>
            </>
          ) : null}
        </div>
      </main>
    </NextUIProvider>
  );
}

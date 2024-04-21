"use client";
import { Button, Input, Snippet, Spinner, Textarea } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { GrPowerReset } from "react-icons/gr";
import { useState } from "react";
import { UploadDropzone } from "@/app/utils/uploadthing";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [clippyId, setClippyId] = useState("");

  const createClippy = async ({ text, url }: { text: string; url: string }) => {
    setSubmitted(true);
    setLoading(true);

    const data = await fetch("/api/createClippy", {
      method: "POST",
      body: JSON.stringify({ text: text, url: url }),
    });
    const response = await data.json();
    setCode(response.id);
    setLoading(false);
  };
  const getPage = (clippyId: string) => {
    router.push(`/${clippyId}`);
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

  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center align-middle justify-between p-24 background content-center w-full">
        <div className="flex flex-col  gap-2 items-center w-[95vw] sm:w-1/2 bg-slate-200/50 p-5 rounded-3xl">
          <Input
            type="text"
            label="Clippy ID"
            value={clippyId}
            onChange={(e) => {
              handleClippyIdChange(e);
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
              onClick={() => createClippy({ text, url })}
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
          <Divider className="my-4" />
          <Button onPress={onOpen} variant="flat" color="default">
            {" "}
            Upload File
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="bg-gray-200">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-black">
                    Upload File
                  </ModalHeader>
                  <ModalBody className="p-10">
                    <UploadDropzone
                      className="bg-slate-200/50 p-5 rounded-3xl m-5"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        setUrl(res[0].url);
                        createClippy({ text, url: res[0].url });
                        console.log("Files: ", res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </main>
    </NextUIProvider>
  );
}

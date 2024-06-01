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
  useDisclosure,
} from "@nextui-org/react";
import Instruction from "./components/Instruction";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [clippyId, setClippyId] = useState("");
  const [showInstruction, setShowInstruction] = useState(false);

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

  const checkClippyId = async (clippyId: string) => {
    const response = await fetch("/api/checkClippy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clippyId }),
    });
    const data = await response.json();
    return data.exists;
  };

  const getPage = async (clippyId: string) => {
    const exists = await checkClippyId(clippyId);
    if (exists) {
      router.push(`/${clippyId}`);
    } else {
      toast.error("This Clippy ID doesn't exist");
      setClippyId("")
    }
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
  const handleAbout=()=>{
    router.push(`/aboutus`);

  }

  const toggleInstruction = () => {
    setShowInstruction((prev) => !prev);
  };

  const closeInstruction = () => {
    setShowInstruction(false);
  };

  return (
    <NextUIProvider>
      <ToastContainer />

      <main className="flex min-h-screen flex-col items-center align-middle justify-between p-24 background content-center w-full">
        <div className="flex flex-col relative gap-2 items-center w-[95vw] sm:w-1/2 bg-slate-200/50 p-5 rounded-3xl ">
          {!showInstruction && (
            <div
              onClick={toggleInstruction}
              className="fixed right-16 bottom-16 bg-white bg-opacity-80 rounded-full py-4 px-6 text-black text-xl hover:bg-opacity-100 cursor-pointer font-bold"
            >
              ?
            </div>
          )}

          <Input
            type="text"
            label="Clippy ID"
            value={clippyId}
            onChange={handleClippyIdChange}
          />
          <Button color="primary" onClick={() => getPage(clippyId)}>
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


          {/* conditional rendering of the instructions */}
          {showInstruction && <Instruction onClose={closeInstruction} />}


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
                      endpoint="Uploader"
                      onClientUploadComplete={(res) => {
                        setUrl(res[0].url);
                        createClippy({ text, url: res[0].url });
                        onClose();
                        console.log("Files: ", res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <footer className="absolute bottom-5">

        <Button onPress={handleAbout}  color="primary">
            {" "}
            About Us
          </Button>
        </footer>
      </main>
    </NextUIProvider>
  );
}

"use client";
import { Button, Input, Snippet, Spinner, Textarea } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { GrPowerReset } from "react-icons/gr";
import { useEffect, useState } from "react";
import { UploadDropzone } from "@/app/utils/uploadthing";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Instruction from "./components/Instruction";
import Footer from "./components/Footer";
import { FaEnvelope } from "react-icons/fa";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [clippyId, setClippyId] = useState("");
  const [showInstruction, setShowInstruction] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [review, setReview] = useState(false);
  const [message, setMessage] = useState(""); // New state for message
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const createClippy = async ({ text, url }: { text: string; url: string }) => {
    setLoading(true);
    if (text.length === 0 && !url) {
      setIsEmpty(true);
      setLoading(false);
      return;
    }
    setSubmitted(true);
    try {
      const response = await fetch("/api/createClippy", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, url }),
      });
      const data = await response.json();
      setCode(data.id);
    } catch (error) {
      console.error("Error creating Clippy:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = (e: any) => {
    e.preventDefault();
    var templateParams = {
      name: name,
      user_email: email,
      message: message,
    };
    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_API_KEY,
      }
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }).catch((error) => {
      console.error('FAILED...', error);
    });
  };

  const getPage = async (clippyId: string) => {
    try {
      const response = await fetch("/api/getPage", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ clippyId }),
      });
      const data = await response.json();

      if (response.status === 404) {
        toast.error("This ClippyID does not exist!");
      } else {
        router.push(`/${clippyId}`);
      }
    } catch (error) {
      console.error("Error fetching Clippy:", error);
      toast.error("An error occurred while fetching the Clippy data.");
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

  useEffect(() => {
    if (text.length > 0 || url.length > 0) {
      setIsEmpty(false);
    }
  }, [text, url]);

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
        <div className="flex flex-col relative gap-2 items-center w-[95vw] md:w-3/4 lg:w-1/2 bg-slate-200/50 p-5 rounded-3xl ">
          {/* Instruction activate button */}
          <div
            onClick={() => setReview(true)}
            className="invisible sm:visible fixed right-10 z-20 bottom-24 bg-white bg-opacity-80 rounded-full py-2 px-4 text-black text-xl hover:bg-opacity-100 cursor-pointer font-bold"
            style={{ padding: "14px 14px" }}
          >
            <FaEnvelope size={18} />
          </div>

          {!showInstruction && (
            <div
              onClick={toggleInstruction}
              className="invisible sm:visible fixed right-10 z-20 bottom-10 bg-white bg-opacity-80 rounded-full py-2 px-4 text-black text-xl hover:bg-opacity-100 cursor-pointer font-bold"
            >
              ?
            </div>
          )}

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
          {isEmpty && (
            <div className="inline-flex items-center justify-between h-fit gap-2 px-3 py-1.5 text-small rounded-medium bg-default/40 text-default-foreground">
              <pre className="text-red-700 font-medium text-lg bg-transparent text-inherit font-mono inline-block whitespace-nowrap">
                <span className="select-none"></span>
                Please Enter Clippy or Upload Any File
              </pre>
            </div>
          )}
          {loading ? (
            <Spinner />
          ) : submitted ? (
            <Snippet symbol="" tooltipProps={{ color: "secondary" }}>
              {code}
            </Snippet>
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
                        // Do something with the response
                        setUrl(res[0].url);
                        createClippy({ text, url: res[0].url });
                        onClose();
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

          <Modal isOpen={review} onOpenChange={() => setReview(false)}>
            <ModalContent className="bg-gray-200">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-black">
                    Review
                  </ModalHeader>
                  <ModalBody className="p-4">
                    <Input
                      type="text"
                      label="Enter Your Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Input
                      type="email"
                      label="Enter Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <Textarea
                      label="Your Review"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={10}
                      className="rounded-md text-black "
                      placeholder="Share your review here..."
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={sendEmail}>
                      Send Email
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        {!submitted ? <Footer /> : <></>}
      </main>
    </NextUIProvider>
  );
}

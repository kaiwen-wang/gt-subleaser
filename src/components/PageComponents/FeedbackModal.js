import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export default function FeedbackModal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  let [modalSubmit, setModalSubmit] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setModalSubmit(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.url = window.location.href;

    // call SendFEedbackApi as a post request
    const response = await fetch("/api/SendFeedbackApi", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      closeModal();
      setTimeout(() => {
        setModalSubmit(false);
        alert("Thank you for your feedback!");
      }, 100);
    }
  };

  useEffect(() => {
    console.log(modalSubmit);
  }, [modalSubmit]);
  return (
    <div className="">
      <div className="fixed bottom-0 right-0 z-30 flex items-center justify-center mb-4 mr-4">
        <button
          type="button"
          onClick={openModal}
          className=" hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-opacity-75 px-4 py-2 text-sm font-medium bg-white border border-black rounded-md"
        >
          Feedback for this page?
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Dialog.Panel className="rounded-2xl w-full max-w-sm p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Send feedback directly
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Anything you find confusing, annoying or that you wish this
                    site had?
                  </p>
                </div>

                <form
                  id="feedbackForm"
                  className="mt-4"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        required
                        id="message"
                        name="message"
                        rows={5}
                        className=" w-full border border-black rounded-sm"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email{" "}
                      <span className="font-normal text-gray-500">
                        (if you want to be contacted further)
                      </span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className=" w-full border border-black rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-8 mb-2 text-center">
                    <button
                      type="submit"
                      className="hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md"
                    >
                      {modalSubmit ? "Loading..." : "Submit Feedback"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

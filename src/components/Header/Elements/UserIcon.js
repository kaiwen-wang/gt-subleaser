import { UserCircleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon as UserCircleIcon2 } from "@heroicons/react/20/solid";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Dialog } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  CursorArrowRippleIcon,
} from "@heroicons/react/24/solid";
import Account from "@/components/Account";

export default function UserIcon() {
  const user = useUser();
  const supabase = useSupabaseClient();

  const [avatarUrl, setAvatarUrl] = useState(null);

  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);
  useEffect(() => {
    if (avatarUrl && !avatarUrl.includes("blob:")) {
      downloadImage(avatarUrl);
    }
  }, [avatarUrl]);

  async function getProfile() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`first_name, self_introduction, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);

      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
      // setAvatarUrl(null);
    }
  }

  let [isOpen, setIsOpen] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  return (
    <>
      <AuthModal
        closeModal={closeModal}
        openModal={openModal}
        state={[isOpen, setIsOpen]}
        supabase={supabase}
      />
      <AccountSettingsModal
        closeModal={closeModal2}
        openModal={openModal2}
        state={[isOpen2, setIsOpen2]}
        session={session}
      />
      <Menu as="div" className=" relative">
        <Menu.Button
          className={`${
            avatarUrl ? "p-0" : "p-1.5"
          } bordershadow-scale-600 rounded-full outline outline-0 outline-gray-200 overflow-hidden hover:bg-gray-100 sm:text-sm flex items-center    `}
        >
          {session ? (
            avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="rounded-full"
                style={{ height: "2.75rem", width: "2.75rem" }}
              />
            ) : (
              <UserCircleIcon2 className="w-8 h-8 text-green-500" />
            )
          ) : (
            <UserCircleIcon className="w-8 h-8 text-gray-700" />
          )}
        </Menu.Button>
        {session ? (
          <Menu.Items className="ring-1 ring-black ring-opacity-5 focus:outline-none absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
            <div className=" px-1 py-1">
              <Menu.Item>
                <Link href="/dashboard">
                  <button
                    className={`text-gray-900 hover:bg-gray-100 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <EditInactiveIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                    Manage Subleases
                  </button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  className={`hover:bg-gray-100 text-gray-900
                     group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={openModal2}
                >
                  <DuplicateInactiveIcon
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                  Account Settings
                </button>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  className={`text-gray-900 hover:bg-gray-100 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={async () => {
                    const { error } = await supabase.auth.signOut();

                    if (error) {
                      console.log(error);
                    }
                  }}
                >
                  <ArrowLeftOnRectangleIcon
                    className="text-violet-400 w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                  Log out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        ) : (
          <Menu.Items className="ring-1 ring-black ring-opacity-5 focus:outline-none hover:bg-gray-100 absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
            <div className=" px-1 py-1">
              <Menu.Item>
                <button
                  className={`${
                    session ? "text-white bg-violet-500" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={openModal}
                >
                  <CursorArrowRippleIcon
                    className="text-violet-400 w-5 h-5 mt-0.5 mr-2"
                    aria-hidden="true"
                  />
                  {/* <DeleteInactiveIcon
                      className="text-violet-400 w-5 h-5 mr-2"
                      aria-hidden="true"
                    /> */}
                  Log In
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        )}
      </Menu>
    </>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function AccountSettingsModal(props) {
  const [isOpen, setIsOpen] = props.state;
  const closeModal = props.closeModal;
  const openModal = props.openModal;
  const session = props.session;

  return (
    <>
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
                  Account Settings
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Feel free to add your name, write a self-introduction, and
                    upload a profile picture so people know who they're
                    subleasing from.
                  </p>
                </div>
                <Account session={session} />
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function AuthModal(props) {
  const [isOpen, setIsOpen] = props.state;
  const closeModal = props.closeModal;
  const openModal = props.openModal;
  const supabase = props.supabase;

  const [modalSubmit, setModalSubmit] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setModalSubmit(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      email: document.getElementById("email").value,
      // options: {
      //   emailRedirectTo: "https://example.com/welcome",
      // },
    });

    if (error) {
      alert(error);
      setModalSubmit(false);
    } else {
      closeModal();

      setTimeout(() => {
        setModalSubmit(false);
        alert("You have been sent a magic link! It expires in 1 hour.");
      }, 100);
    }
  };

  return (
    <>
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
                  Log In
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You will be emailed a magic link to log in.
                  </p>
                </div>

                <form id="loginForm" className="mt-4" onSubmit={handleLogin}>
                  <div className="flex flex-col">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="@gatech.edu emails only"
                        pattern=".+@gatech\.edu"
                        required
                        size="75"
                        className=" w-full border border-black rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-8 mb-2 text-center">
                    <button
                      type="submit"
                      className="hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md"
                    >
                      {modalSubmit ? "Loading..." : "Send Magic Link"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

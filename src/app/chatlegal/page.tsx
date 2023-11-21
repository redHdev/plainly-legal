"use client";
import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";

// Import json messages.
import preDeterminedMessages from "./messages.json";

// Defining the action types
const BOT_ADDS_MESSAGE = "BOT_ADDS_MESSAGE";
const USER_ADDS_MESSAGE = "USER_ADDS_MESSAGE";
const USER_SEEN_MESSAGES = "USER_SEEN_MESSAGES";

interface PreDeterminedMessages {
  [key: string]: BotChatResponse;
}

interface Option {
  text: string;
  value: string;
}
interface QuickReply {
  text: string;
  options: Option[];
}
interface BotChatResponse {
  type: "laywer" | "automated";
  text: string;
  quickReply?: QuickReply;
  seen: boolean;
}

enum userReponseTypes {
  text = "text-input",
  quickReply = "quick-reply",
}

interface UserChatResponse {
  type: userReponseTypes;
  text: string;
}

interface Message {
  sender: "bot" | "user";
  message: UserChatResponse | BotChatResponse;
}

type Action = {
  type: string;
  payload?: UserChatResponse | BotChatResponse;
};

// The reducer function to manage the state changes
function conversationReducer(state: Message[], action: Action): Message[] {
  switch (action.type) {
    case BOT_ADDS_MESSAGE:
      return [
        ...state,
        { sender: "bot", message: action.payload as BotChatResponse },
      ];
    case USER_ADDS_MESSAGE:
      return [
        ...state,
        { sender: "user", message: action.payload as UserChatResponse },
      ];
    case USER_SEEN_MESSAGES:
      return state.map((message) => {
        if (message.sender === "bot") {
          const botMessage = message.message as BotChatResponse;
          botMessage.seen = true;
          return { sender: "bot", message: botMessage };
        }
        return message;
      });
    default:
      return state;
  }
}

function getBotResponse(userMessage: UserChatResponse): BotChatResponse {
  const botResponses: PreDeterminedMessages =
    preDeterminedMessages as PreDeterminedMessages;

  const noAnswer = {
    seen: false,
    type: "automated",
    text: "Sorry, I don't quite understand your question. Please try again.",
  } as BotChatResponse;

  //only look for the key if we are on a quick reply by removing anything after | in the text
  const key = userMessage.text
    .toLowerCase()
    .split("|")[0] as keyof PreDeterminedMessages;

  return botResponses[key] ?? noAnswer;
}

const Chat: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [draftMessage, setDraftMessage] = useState<string>("");
  const [isScrolledUp, setIsScrolledUp] = useState<boolean>(false);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);
  //Default Messages. This will later be replaced with a call to the backend to get any previous messages in this conversation.
  const initialConversation: Message[] = [];
  const [conversation, dispatch] = useReducer(
    conversationReducer,
    initialConversation,
  );

  //Check if any of the messages have seen false. If so, set the isBotTypeing to true
  const isBotTyping = conversation.some((message) => {
    if (message.sender === "bot") {
      const botMessage = message.message as BotChatResponse;
      return !botMessage.seen;
    }
    return false;
  });

  //Add the user's message to the conversation and clear the draft message.
  function sendMessage(message: string, type?: userReponseTypes) {
    dispatch({
      type: USER_ADDS_MESSAGE,
      payload: {
        text: message,
        type: type ?? ("text-input" as userReponseTypes),
      },
    });
    setDraftMessage("");
  }

  //Add the user's message to the drafts
  function updateDraftMessage(event: React.ChangeEvent<HTMLInputElement>) {
    setDraftMessage(event.target.value);
  }

  function checkIsScrolled() {
    const { current } = chatRef;
    const { scrollHeight, scrollTop, clientHeight } = current || {};
    let areWeUp = null;

    if (scrollHeight && scrollTop && clientHeight && current) {
      if (scrollHeight - scrollTop - clientHeight > 200) {
        areWeUp = true;
      } else {
        areWeUp = false;
      }
    }

    if (areWeUp !== null) setIsScrolledUp(areWeUp);
  }

  //Scroll to the bottom of the chat if the user is within 500px of the bottom
  const scrollToNew = useCallback(() => {
    const { current } = chatRef;
    const { scrollHeight } = current || {};
    if (!isScrolledUp) {
      current?.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isScrolledUp]);

  //If it's a new bot message, do this
  const listenNewBotMessage = useCallback(() => {
    scrollToNew();
  }, [scrollToNew]);

  const handleBotThink = useCallback(
    (thinking: boolean) => {
      setTimeout(() => {
        setIsBotThinking(thinking);
      }, 500);
      setTimeout(() => {
        //Scroll to the new thinking they have just shown
        scrollToNew();
      }, 550);
    },
    [scrollToNew],
  );

  //If it's a new user message, do this
  const listenNewUserMessage = useCallback(
    (lastMessage: Message) => {
      //Scroll to the new message they have just sent
      scrollToNew();

      //Set the bot to be thinking...
      handleBotThink(true);

      //Dispatch what the bot should respond with after a 750ms delay to simulate the bot "thinking"
      setTimeout(() => {
        dispatch({
          type: BOT_ADDS_MESSAGE,
          payload: getBotResponse(lastMessage.message as UserChatResponse),
        });
        setIsBotThinking(false);
      }, 1200);
    },
    [handleBotThink, scrollToNew],
  );

  // any time the chat changes, check if the bot should come up with a response
  useEffect(() => {
    //Confirm that we have a conversation[conversation.length - 1] object and that the last message was from the user
    const lastMessage = conversation[conversation.length - 1] as
      | Message
      | undefined;

    //Confirm the lastMessage is not undefined and that the last message was from the user
    if (!lastMessage) return;

    //If the last message was from the user, run the user function, if not, run the bot function
    if (lastMessage.sender === "user") {
      listenNewUserMessage(lastMessage);
    } else {
      listenNewBotMessage();
    }
  }, [conversation, listenNewUserMessage, listenNewBotMessage]);

  //Show the correct badge based on the message passed in
  function Badge({ message }: { message?: BotChatResponse }) {
    if (!message)
      return <div className="pl-auto-badge w-full">Thinking...</div>;
    if (message.type === "laywer") {
      return (
        <>
          <Image
            width="10"
            height="10"
            className="h-5 w-5"
            src={"/assets/icons/verified.svg"}
            alt="Verified badge"
          />
          <div className="pl-verified-badge w-full">
            Verified answer written by a lawyer
          </div>
        </>
      );
    } else {
      return <div className="pl-auto-badge w-full">Automated answer</div>;
    }
  }

  function QuestionBlock({
    conversation,
    onChange,
  }: {
    conversation: Message[];
    onChange: (value: string) => void;
  }) {
    //Get the last message in the conversation
    const lastMessage = conversation[conversation.length - 1] as
      | Message
      | undefined;

    //Confirm we have a last message and it's not from the user
    if (!lastMessage || lastMessage.sender === "user") return null;

    //Confirm the last message is from the bot
    const lastBotMessage = lastMessage.message as BotChatResponse;

    //Confirm we should show quick replies
    if (!lastBotMessage.quickReply) return null;

    const { quickReply } = lastBotMessage;

    return (
      <div className="mb-8 w-full">
        <div className="label-container mb-5 text-center">
          <span id="web_dev_type-label" className="text-center text-lg">
            {quickReply.text}
          </span>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          {quickReply.options.map((option, index) => {
            return (
              <button
                key={index}
                className="grid h-full w-full"
                onClick={() => onChange(option.value + "|" + option.text)}
              >
                <label
                  className="flex h-full w-full cursor-pointer items-center justify-center rounded border border-purple-100 bg-white p-2 text-center text-sm leading-5 transition-all duration-200 hover:border-light_purple-200 hover:bg-light_purple-50 peer-checked:border-[#C64236] peer-checked:bg-[#F88379] peer-checked:text-white lg:text-base"
                  htmlFor="web_dev_type_opt_2"
                >
                  {option.text}
                </label>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function submitQuickReply(message: string) {
    sendMessage(message, "quick-reply" as userReponseTypes);
  }

  function BotText({
    response,
    onComplete,
  }: {
    response: BotChatResponse;
    onComplete: () => void;
  }) {
    const { text, seen } = response;
    const [words, setWords] = useState<string[]>([]);

    const wordsNeeded = text.split(" ");

    useEffect(() => {
      if (!seen) {
        const interval = setInterval(() => {
          if (wordsNeeded.length > words.length) {
            //Add the next word from wordsNeeded to words
            setWords([...words, wordsNeeded[words.length] ?? ""]);
            //Scroll
            scrollToNew();
          } else {
            onComplete();
          }
        }, 30);
        return () => clearInterval(interval);
      }
    }, [words, text, onComplete, seen, wordsNeeded]);

    //Get either the streaming text, or the static text to display
    const textToDisplay = seen ? text : words.join(" ");

    return <p dangerouslySetInnerHTML={{ __html: textToDisplay }}></p>;
  }

  function userSeenMessages() {
    dispatch({ type: USER_SEEN_MESSAGES });
  }

  function Thinking() {
    return (
      <div className="pl-message pl-message-bot pl-shadow my-12 mr-auto w-full rounded border  p-5 text-left">
        <div
          className="grid-cols-auto grid justify-start gap-5 align-middle"
          style={{ gridAutoFlow: "column" }}
        >
          <div className="h-7 w-7 overflow-hidden rounded bg-[#fff]">
            <Image
              width="100"
              height="100"
              className="w-100"
              src={"/assets/images/plainly-legal-profile.png"}
              alt="Bobby Klinck Profile"
            />
          </div>
          <div className="pl-chat-answer flex-1">
            <div className="align-center mb-3 flex gap-2">
              <Badge />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function NoMessages() {
    return (
      <div className="mb-[10rem] flex h-full w-full max-w-3xl justify-center px-3">
        <div className="mb-6 grid content-center px-4 text-center">
          <Image
            width="60"
            height="60"
            className="w-100 mx-auto mb-6 rounded"
            src={"/assets/images/plainly-legal-profile.png"}
            alt="Bobby Klinck Profile"
          />
          <h2 className="mb-2">
            Welcome to ChatLegal&trade;
            <span style={{ color: "#59cbe8" }}>.</span>
          </h2>
          <h4>What can I help you with today?</h4>
        </div>
      </div>
    );
  }

  //Show all user and bot messages.
  const messages = conversation.map((node, index) => {
    if (node.sender === "bot") {
      const response = node.message as BotChatResponse;
      return (
        <div
          key={index}
          className="pl-message pl-message-bot pl-shadow my-12 mr-auto w-full rounded border  p-5 text-left"
        >
          <div
            className="grid-cols-auto grid justify-start gap-5 align-middle"
            style={{ gridAutoFlow: "column" }}
          >
            <div className="h-7 w-7 overflow-hidden rounded bg-[#fff]">
              <Image
                width="100"
                height="100"
                className="w-100"
                src={"/assets/images/plainly-legal-profile.png"}
                alt="Bobby Klinck Profile"
              />
            </div>
            <div className="pl-chat-answer flex-1">
              <div className="align-center mb-3 flex gap-2">
                <Badge message={response} />
              </div>
              <BotText response={response} onComplete={userSeenMessages} />
            </div>
          </div>
        </div>
      );
    } else {
      const response = node.message as UserChatResponse;
      let displayText = response.text;
      //Confirm the users message is not a quick reply. If it is, only show the pretty value
      if (response.type === ("quick-reply" as userReponseTypes))
        displayText = displayText.split("|")[1] ?? "";

      //If it's a user message, show it
      return (
        <div
          key={index}
          className="pl-message pl-message-user pl-shadow my-12 w-full rounded border p-5  text-right"
        >
          <div
            className="grid-cols-auto grid justify-start gap-5 align-middle"
            style={{ gridAutoFlow: "column" }}
          >
            <div className="h-7 w-7 overflow-hidden rounded bg-[#fff]">
              <Image
                width="100"
                height="100"
                className="w-100"
                src={"/assets/images/profile.jpg"}
                alt="Bobby Klinck Profile"
              />
            </div>
            <div className="flex-1">
              <p>{displayText}</p>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <section id="content" className="flex-grow p-0">
      <div
        className="flex h-[90vh] w-full flex-col items-center overflow-y-scroll p-0"
        ref={chatRef}
        onScroll={checkIsScrolled}
      >
        <div className="mb-[10rem] w-full max-w-3xl px-3 pt-12">
          {/* Show welcome message if there's no messages */}
          {messages.length === 0 && <NoMessages />}

          {/* Show Messages */}
          {messages}

          {/* Show thinking indicator */}
          {isBotThinking && <Thinking />}

          {/* Show Question Block if needed */}
          {!isBotTyping && (
            <QuestionBlock
              conversation={conversation}
              onChange={submitQuickReply}
            />
          )}
        </div>
      </div>

      {/* Send Messages */}
      <div className="pl-shadow b-g-purple-900 fixed bottom-0 mt-6 flex w-full flex-col border bg-[#fff]">
        {/* Return to latest message scroll down button */}
        {isScrolledUp && (
          <button
            className="pDy-2 border-y-[1px] border-y-purple-100"
            onClick={() => {
              chatRef.current?.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: "smooth",
              });
            }}
          >
            Jump To Latest Message
          </button>
        )}
        <div className="flex w-full justify-center px-4 py-8">
          <form
            className="flex w-full max-w-2xl justify-center align-middle"
            ref={form}
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(draftMessage);
            }}
          >
            <label
              role="group"
              aria-labelledby="users_agreement_name-label"
              className="relative mr-3 w-full"
            >
              <input
                placeholder=""
                type="text"
                name="users_agreement_name"
                id="chat-legal-input"
                value={draftMessage}
                onChange={updateDraftMessage}
              />
            </label>
            <button
              onClick={(e) => {
                e.preventDefault();
                sendMessage(draftMessage);
              }}
              className="p-2"
            >
              <Image
                width="40"
                height="40"
                className="h-7 w-7"
                src={"/assets/icons/send.svg"}
                alt="Send"
              />
            </button>
          </form>
        </div>
      </div>

      <style>
        {`
            body {
              max-height: 100vh;
              overflow: hidden;
            }

            .pl-verified-badge {
              color: #2196f3;
              font-size: 0.8rem;
              font-weight: 700;
            }
            .pl-auto-badge {
              color: #ccc;
              font-size: 0.8rem;
              font-weight: 700;
            }
          `}
      </style>
    </section>
  );
};

export default Chat;

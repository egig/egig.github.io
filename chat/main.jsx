// Mounts the sideagent floating chat on any page that loads this bundle.
// The publishable key comes from the script tag's data-publishable-key attribute
// (set via `params.sideagent.publishableKey` in hugo.toml).
import { createRoot } from "react-dom/client";
import { AgentChat } from "sideagent";

const script = document.currentScript;
const publishableKey = script && script.dataset.publishableKey;

if (publishableKey) {
  const host = document.createElement("div");
  host.id = "sideagent-chat";
  document.body.appendChild(host);
  createRoot(host).render(
    <AgentChat
      publishableKey={publishableKey}
      mode="floating"
      history={false}
      newChatButton={false}
    />
  );
}

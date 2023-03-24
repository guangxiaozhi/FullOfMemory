import { keydownHandler } from "prosemirror-keymap";
import { Plugin } from "prosemirror-state";
/**
 * Create a case normalize keymap plugin based on prosemirror-keymap package.
 * Case sensitivity is normalized based on the status of the shift key (ignoring caps lock key)
 * @param bindings Object that maps key names to [command](https://prosemirror.net/docs/ref/#commands)-style functions
 */
export const caseNormalizeKeymap = (bindings) => {
    const handleKeyDown = (view, event) => {
        let proxyEvent = event;
        // if the key is a letter, we create a copy of the event that maps the key to the
        // uppercase letter when the shift key is pressed and lowercase when it is not
        const isKeyLetter = event.key.match(/^[A-Za-z]$/);
        if (isKeyLetter) {
            proxyEvent = new KeyboardEvent("keydown", {
                keyCode: event.keyCode,
                altKey: event.altKey,
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                shiftKey: event.shiftKey,
                key: event.shiftKey
                    ? event.key.toUpperCase()
                    : event.key.toLowerCase(),
            });
        }
        return keydownHandler(bindings)(view, proxyEvent);
    };
    return new Plugin({ props: { handleKeyDown } });
};

import { Command, Plugin } from "prosemirror-state";
/**
 * Create a case normalize keymap plugin based on prosemirror-keymap package.
 * Case sensitivity is normalized based on the status of the shift key (ignoring caps lock key)
 * @param bindings Object that maps key names to [command](https://prosemirror.net/docs/ref/#commands)-style functions
 */
export declare const caseNormalizeKeymap: (bindings: {
    [key: string]: Command;
}) => Plugin<any>;

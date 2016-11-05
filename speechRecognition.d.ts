/**
 * The SpeechRecognition interface of the Web Speech API is the controller
 * interface for the recognition service; this also handles the
 * SpeechRecognitionEvent sent from the recognition service.
 */
declare class SpeechRecognition extends EventTarget {
  /**
   * The grammars property of the SpeechRecognition interface returns and sets
   * a collection of SpeechGrammar objects that represent the grammars that
   * will be understood by the current SpeechRecognition.
   */
  grammars: SpeechGrammarList;

  /**
   * The lang property of the SpeechRecognition interface returns and sets the
   * language of the current SpeechRecognition. If not specified, this defaults
   * to the HTML lang attribute value, or the user agent's language setting if
   * that isn't set either.
   *
   * A DOMString representing the BCP 47 language tag for the current
   * SpeechRecognition, e.g. 'en-US'
   */
  lang: string;

  /**
   * The continuous property of the SpeechRecognition interface controls
   * whether continuous results are returned for each recognition, or only a
   * single result.
   *
   * It defaults to single results (false.)
   */
  continuous: boolean;

  /**
   * The interimResults property of the SpeechRecognition interface controls
   * whether interim results should be returned (true) or not (false.) Interim
   * results are results that are not yet final (e.g. the
   * SpeechRecognitionResult.isFinal property is false.)
   *
   * The default is true.
   */
  interimResults: boolean;

  /**
   * The maxAlternatives property of the SpeechRecognition interface sets the
   * maximum number of SpeechRecognitionAlternatives provided per
   * SpeechRecognitionResult.
   *
   * The default value is 1.
   */
  maxAlternatives: number;

  /**
   * The serviceURI property of the SpeechRecognition interface specifies the
   * location of the speech recognition service used by the current
   * SpeechRecognition to handle the actual recognition. The default is the
   * user agent's default speech service.
   */
  serviceURI: string;

  /**
   * Stops the speech recognition service from listening to
   * incoming audio, and doesn't attempt to return a
   * SpeechRecognitionResult.
   */
  abort(): void;

  /**
   * The start() method of the Web Speech API starts the speech recognition
   * service listening to incoming audio with intent to recognize grammars
   * associated with the current SpeechRecognition.
   */
  start(): void;

  /**
   * The stop() method of the Web Speech API stops the speech recognition
   * service from listening to incoming audio, and attempts to return a
   * SpeechRecognitionResult using the audio captured so far.
   */
  stop(): SpeechRecognitionResult;

  /**
   * The audiostart event of the Web Speech API is fired when the user agent
   * has started to capture audio for speech recognition.
   */
  addEventListener(type: "audiostart", listener: (this: this, ev: Event) => any, useCapture?: boolean): void;

  /**
   * The audioend event of the Web Speech API is fired when the user agent has
   * finished capturing audio for speech recognition.
   */
  addEventListener(type: "audioend", listener: (this: this, ev: Event) => any, useCapture?: boolean): void;

  /**
   * The end event of the Web Speech API SpeechRecognition object is fired when
   * the speech recognition service has disconnected.
   */
  addEventListener(type: "end", listener: (this: this, ev: Event) => any, useCapture?: boolean): void;

  /**
   * The error event of the Web Speech API SpeechRecognition object is fired
   * when a speech recognition error occurs.
   */
  addEventListener(type: "error", listener: (this: this, ev: SpeechRecognitionError) => any, useCapture?: boolean): void;

  /**
   * The nomatch event of the Web Speech API is fired when the speech
   * recognition service returns a final result with no significant recognition.
   *
   * This may involve some degree of recognition, which doesn't meet or exceed
   * the confidence threshold.
   */
  addEventListener(type: "nomatch", listener: (this: this, ev: SpeechRecognitionEvent) => any, useCapture?: boolean): void;

  /**
   * The result event of the Web Speech API is fired when the speech
   * recognition service returns a result — a word or phrase has been
   * positively recognized and this has been communicated back to the app.
   */
  addEventListener(type: "result", listener: (this: this, ev: SpeechRecognitionEvent) => any, useCapture?: boolean): void;

  /**
   * The soundstart event of the Web Speech API is fired when any sound —
   * recognisable speech or not — has been detected.
   */
  addEventListener(type: "soundstart", listener: (this: this, ev: Event) => any, useCapture?: boolean): void;

  /**
   * The soundend event of the Web Speech API is fired when any sound —
   * recognisable speech or not — has stopped being detected.
   */
  addEventListener(type: "soundend", listener: (this: this, ev: Event) => any, useCapture?: boolean): void;

  /**
   * The speechstart event of the Web Speech API is fired when sound recognised
   * by the speech recognition service as speech has been detected.
   */
  addEventListener(type: "speechstart", listener: (this: this, ev: Event) => any, useCapture?: boolean): void;

  /**
   * The speechend event of the Web Speech API is fired when speech recognised
   * by the speech recognition service has stopped being detected
   */
  addEventListener(type: "speechend", listener: (this: this, ev: Event) => any, useCapture?: boolean): void;

  /**
   * The start event of the Web Speech API SpeechRecognition object is fired
   * when the speech recognition service has begun listening to incoming audio
   * with intent to recognize grammars associated with the current
   * SpeechRecognition.
   */
  addEventListener(type: "start", listener: (this: this, ev: Event) => any, useCapture?: boolean): void;


}

/**
 * The SpeechGrammarList interface of the Web Speech API represents a list of
 * SpeechGrammar objects containing words or patterns of words that we want the
 * recognition service to recognize.
 *
 * Grammar is defined using JSpeech Grammar Format (JSGF.) Other formats may
 * also be supported in the future.
 */
declare class SpeechGrammarList {
  /**
   * Returns the number of SpeechGrammar objects contained in the
   * SpeechGrammarList.
   */
  readonly length: number;

  [index: number]: SpeechGrammar | undefined;

  /**
   * The addFromURI() method of the SpeechGrammarList interface takes a grammar
   * present at a specific URI and adds it to the SpeechGrammarList as a new
   * SpeechGrammar object.
   *
   * Note that some speech recognition services may support built-in grammars
   * that can be specified by URI.
   *
   * @param src A string representing the URI of the grammar to be added.
   * @param weight A float representing the weight of the grammar relative to
   *     other grammars present in the SpeechGrammarList. The weight means the
   *     importance of this grammar, or the likelihood that it will be
   *     recognised by the speech recognition service. The value can be between
   *     0.0 and 1.0; If not specified, the default used is 1.0.
   */
  addFromURI(src: string, weight?: number): void;

  /**
   * The addFromString() method of the SpeechGrammarList interface takes a
   * grammar present in a specific DOMString within the code base (e.g. stored
   * in a variable) and adds it to the SpeechGrammarList as a new SpeechGrammar
   * object.
   *
   * @param src A string representing the grammar to be added.
   * @param weight A float representing the weight of the grammar relative to
   *     other grammars present in the SpeechGrammarList. The weight means the
   *     importance of this grammar, or the likelihood that it will be
   *     recognised by the speech recognition service. The value can be between
   *     0.0 and 1.0; If not specified, the default used is 1.0.
   */
  addFromString(src: string, weight?: number): void;
}

/**
 * The SpeechGrammar interface of the Web Speech API represents a set of words
 * or patterns of words that we want the recognition service to recognize.
 *
 * Grammar is defined using JSpeech Grammar Format (JSGF.) Other formats may
 * also be supported in the future.
 */
declare class SpeechGrammar {
  /**
   * The src property of the SpeechGrammar interface sets and returns a string
   * containing the grammar from within in the SpeechGrammar object.
   */
  src: string;

  /**
   * The optional weight property of the SpeechGrammar interface sets and
   * returns the weight of the SpeechGrammar object.
   *
   * A float representing the weight of the grammar, in the range 0.0–1.0.
   */
  weight: number;
}

/**
 * The SpeechRecognitionResultList interface of the Web Speech API represents a
 * list of SpeechRecognitionResult objects, or a single one if results are
 * being captured in continuous mode.
 */
declare class SpeechRecognitionResultList {
  readonly length: number;

  [index: number]: SpeechRecognitionResult | undefined;
}

/**
 * The SpeechRecognitionResult interface of the Web Speech API represents a
 * single recognition match, which may contain multiple
 * SpeechRecognitionAlternative objects.
 */
declare class SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;

  [index: number]: SpeechRecognitionAlternative | undefined;
}

/**
 * The SpeechRecognitionAlternative interface of the Web Speech API represents
 * a single word that has been recognised by the speech recognition service.
 */
declare class SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

/**
 * The SpeechRecognitionError interface of the Web Speech API represents error
 * messages from the recognition service.
 */
declare class SpeechRecognitionError extends Event {
  /** Returns the type of error raised. */
  readonly error: "no-speech" | "aborted" | "audio-capture" | "network" | "not-allowed" | "service-not-allowed" | "bad-grammar" | "language-not-supported";

  /** Returns a message describing the error in more detail. */
  readonly message;
}

/**
 * The SpeechRecognitionEvent interface of the Web Speech API represents the
 * event object for the result and nomatch events, and contains all the data
 * associated with an interim or final speech recognition result.
 */
declare class SpeechRecognitionEvent extends Event {
  /**
   * Returns an Extensible MultiModal Annotation markup language (EMMA) — XML —
   * representation of the result.
   *
   * A valid XML document. The exact contents can vary across user agents and
   * recognition engines, but all supporting implementations will expose a
   * valid XML document complete with an EMMA namespace. If the speech
   * recognition system does not supply EMMA data then the user agent will
   * return null.
   */
  readonly emma: XMLDocument | null;

  /**
   * Returns the semantic meaning of what the user said.
   *
   * This might be determined, for instance, through the SISR specification of
   * semantics in a grammar (see Semantic Interpretation for Speech Recognition
   * (SISR) Version 1.0 for specification and examples.)
   *
   * The returned value can be of any type. If no semantic interpretation has
   * been returned by the speec recognition system, null will be returned.
   */
  readonly interpretation: any;

  /**
   * Returns the lowest index value result in the SpeechRecognitionResultList
   * "array" that has actually changed.
   */
  readonly resultIndex: number;

  /**
   * Returns a SpeechRecognitionResultList object representing all the speech
   * recognition results for the current session.
   *
   * Specifically this object will contain all final results that have been
   * returned, followed by the current best hypothesis for all interim results.
   * When subsequent result events are fired, interim results may be
   * overwritten by a newer interim result or by a final result — they may even
   * be removed, if they are at the end of the "results" array and the array
   * length decreases. Final results  on the other hand will not be overwritten
   * or removed.
   */
  readonly results: SpeechRecognitionResultList;
}

declare let webkitSpeechRecognition: typeof SpeechRecognition | undefined;

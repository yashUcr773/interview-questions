/**
 * * https://leetcode.com/problems/stream-of-characters/description/
 * Problem Statement: You are processing a live stream of characters (transcript) from a call. 
 * You have a static list of $K$ keywords ( vocabulary), some of which might be phrases (e.g., "call manager"). 
 * Design a StreamMatcher that accepts characters one by one and returns true immediately when a keyword ends. 
 * * Constraint 1: The vocabulary size can be large (10k+ words). 
 * * Constraint 2: Checking must be $O(1)$ per character to handle thousands of concurrent streams in the Consumer service. 
 * Naive string matching ($O(K \cdot L)$) is too slow. 
 * Example: 
 * * keywords = ["apple", "app", "apply"] 
 * * stream = "h", "e", "y", " ", "a", "p", "p", "l", "y" 
 * 'a' -> No match 
 * 'p' -> No match
 * 'p' -> Match "app"!
 * 'l' -> No match
 * 'y' -> Match "apply"!
 */

// Constant Declarations
const keywords = ["call manager", "manager"];
const stream = ['c', 'a', 'l', 'l', ' ', 'm', 'a', 'n', 'a', 'g', 'e', 'r'];

// const keywords = ["apple", "app", "apply"]
// const stream = ["h", "e", "y", " ", "a", "p", "p", "l", "y"]

// My approach 1, trie, map of maps
function approach1() {
    // Trie to store data
    const trie = {};

    // Preprocess phase
    function addToTrie(word) {
        let temp = trie;
        for (let ch of word) {
            if (!temp[ch]) {
                temp[ch] = {}
            }
            temp = temp[ch]
        }
        temp['end'] = true
    }

    for (let word of keywords) {
        addToTrie(word)
    }

    // Stream phase
    let candidates = []

    for (let ch of stream) {

        // test candidates
        let tempCandidates = [];
        for (let candidate of candidates) {
            if (candidate.currentMap[ch]) {
                if (candidate.currentMap[ch].end) {
                    console.log(candidate.currentString + "" + ch, "match");
                }
                tempCandidates.push({ currentMap: candidate.currentMap[ch], currentString: candidate.currentString + "" + ch });
            }
        }

        // if character is in trie, this means start tracking a new candidate
        if (trie[ch]) {
            if (trie[ch].end) {
                console.log(ch, ' match')
            } else {
                tempCandidates.push({ currentMap: trie[ch], currentString: ch })
            }
        }

        candidates = tempCandidates

    }
}

// Best approach, Aho–Corasick
function approach1Optimized() {
    function createNode() {
        return {
            next: new Map(),     // char -> node
            fail: null,          // failure link
            outputs: []          // keywords ending here
        };
    }
    function buildTrie(keywords) {
        const root = createNode();

        for (const word of keywords) {
            let node = root;
            for (const ch of word) {
                if (!node.next.has(ch)) {
                    node.next.set(ch, createNode());
                }
                node = node.next.get(ch);
            }
            node.outputs.push(word);
        }

        return root;
    }
    function buildFailureLinks(root) {
        const queue = [];

        root.fail = root;

        // First level
        for (const child of root.next.values()) {
            child.fail = root;
            queue.push(child);
        }

        // BFS
        while (queue.length > 0) {
            const current = queue.shift();

            for (const [ch, nextNode] of current.next.entries()) {
                let f = current.fail;

                while (f !== root && !f.next.has(ch)) {
                    f = f.fail;
                }

                if (f.next.has(ch)) {
                    nextNode.fail = f.next.get(ch);
                } else {
                    nextNode.fail = root;
                }

                // 🔑 Propagate outputs through failure links
                nextNode.outputs = nextNode.outputs.concat(nextNode.fail.outputs);

                queue.push(nextNode);
            }
        }
    }
    function createStreamMatcher(keywords) {
        const root = buildTrie(keywords);
        buildFailureLinks(root);

        let state = root;

        return function feed(ch) {
            while (state !== root && !state.next.has(ch)) {
                state = state.fail;
            }

            if (state.next.has(ch)) {
                state = state.next.get(ch);
            }

            // Return all matches ending at this character
            return state.outputs;
        };
    }

    const feed = createStreamMatcher(keywords);

    for (const ch of stream) {
        const matches = feed(ch);
        if (matches.length > 0) {
            console.log("matched:", matches);
        }
    }
}

// My approach 2, linked list
function approach2() {

    // pre processing
    class Node {
        constructor(value, next = {}, end = false) {
            this.value = value
            this.next = next
            this.end = end
        }
    }

    const head = new Node("", {}, false)

    function generateTrie(word) {
        let current = head
        for (let ch of word) {
            if (!current.next[ch]) {
                const node = new Node(ch)
                current.next[ch] = node
            }
            current = current.next[ch]
        }
        current.end = true
    }

    for (let word of keywords) {
        generateTrie(word)
    }

    // stream

    let cands = []

    for (let ch of stream) {
        let tempHead = head
        let tempCandidates = []
        if (tempHead.next[ch]) {
            if (tempHead.next[ch].end) {
                console.log('match', ch)
            } else {
                tempCandidates.push({ node: tempHead.next[ch], word: ch })
            }
        }

        for (let candidate of cands) {
            let { node, word } = candidate;
            if (node.next[ch]) {
                if (node.next[ch].end) {
                    console.log('match', word + ch)
                }
                tempCandidates.push({ node: node.next[ch], word: word + ch })
            }
        }

        cands = tempCandidates
    }
}

approach1Optimized()
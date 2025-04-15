# text-count-mcp-server

A Model Context Protocol (MCP) server that provides text counting tools for AI models.

## Overview

This server implements the Model Context Protocol to provide tools for counting characters and words in text. These tools help AI models to accurately count text elements without relying on their own counting abilities.

## Features

- **count_characters**: Count the number of characters in a text string
- **count_words**: Count the number of words in a text string (currently supports English and other space-delimited languages)

## Installation

```bash
npm install
```

## Usage

### As a standalone server

```bash
node build/index.js
```

### With an MCP-compatible client

This server can be used with any client that supports the Model Context Protocol.

## API

### count_characters

Counts the number of characters in the provided text.

**Input:**

```json
{
  "text": "The text to count characters in."
}
```

**Output:**

```json
{
  "content": [
    {
      "type": "text",
      "text": "The text contains 30 characters."
    }
  ]
}
```

### count_words

Counts the number of words in the provided text.

**Input:**

```json
{
  "text": "The text to count words in."
}
```

**Output:**

```json
{
  "content": [
    {
      "type": "text",
      "text": "The text contains 6 words."
    }
  ]
}
```

## Limitations

- Japanese language word counting is not yet supported.
- Other languages use space-based word splitting, which may not be accurate for all languages.

## License

See the [LICENSE](LICENSE) file for license rights and limitations.

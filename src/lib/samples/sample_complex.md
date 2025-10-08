# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Inline formatting

This is **bold text** and this is also __bold text__.

This is _italic text_ and this is also *italic text*.

This is ~~strikethrough text~~.

This is `inline code` with backticks.

This is a [link to example](https://example.com) in text.

## Lists

- list item 1
- list item 2
- list item 3

* alternative list item 1
* alternative list item 2
  - indented list item 1
  - indented list item 2
    - Deeply nested item

  - after a newline

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

> Another blockquote with **bold** and _italic_.

## Fenced Code Blocks

### TypeScript

```ts
const greeting: string = 'Hello, world!';
const count: number = 42;

function add(a: number, b: number): number {
	return a + b;
}
```

#### TypeScript with alias 'typescript'

```typescript
interface User {
	name: string;
	age: number;
}

const user: User = {name: 'Alice', age: 30};
```

### JavaScript

```js
const greeting = 'Hello, world!';
const count = 42;

function add(a, b) {
	return a + b;
}
```

#### JavaScript with alias 'javascript'

```javascript
const multiply = (a, b) => a * b;
const result = multiply(5, 3);
console.log(result);
```

### CSS

```css
.container {
	display: flex;
	justify-content: center;
	align-items: center;
}

#unique {
	background-color: #f0f0f0;
	border: 1px solid rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
	body {
		font-size: 14px;
	}
}
```

### HTML

```html
<!doctype html>
<div class="test">
	<p>hello world!</p>
</div>

<button type="button" disabled>click me</button>

<!-- comment -->
```

#### HTML with alias 'markup'

```markup
<ul>
	<li>list item 1</li>
	<li>list item 2</li>
</ul>
```

### JSON

```json
{
	"name": "fuz_code",
	"version": "1.0.0",
	"dependencies": {
		"example": "^1.2.3"
	},
	"array": [1, 2, 3, true, false, null]
}
```

### Svelte

```svelte
<script lang="ts">
	let count: number = $state(0);
	const increment = () => count++;
</script>

<button type="button" onclick={increment}>
	Count: {count}
</button>

<style>
	button {
		padding: 8px 16px;
	}
</style>
```

### Unknown Language

```python
def hello(name):
    print(f"Hello, {name}!")

hello("world")
```

## Edge Cases

**bold** and **bold** in the same line.

_italic_ and _italic_ in the same line.

**bold** with _italic_ and ~~strikethrough~~ all mixed.

A sentence with `code`, **bold**, _italic_, and [a link](https://example.com).

Not bold: ** spaces around **, ** spaces around **.

Not italic: _ spaces around _, _ spaces around _.

Not code: `multiline`.

````

Empty fence above.

```unknownlang
Plain text for unknown language.
````

## HTML Support

Since Markdown extends HTML, raw HTML is also styled:

<div class="container">
	<p>This HTML is <strong>styled</strong> correctly!</p>
</div>

HTML can wrap code blocks:

<div>

```ts
const example = 'embedded code';
```

</div>

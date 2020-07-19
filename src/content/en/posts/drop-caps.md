---
title: 'Drop caps reloaded (yet still hackish)'
description: 'The confusing state of Web affairs of a timeless typographic flourish.'
date: 2020-07-17
tags:
  - webdev
  - css
translationKey: drop-caps
---

It's 2020 and, in spite of everything that is happening *out there*, at least we can always count on our ever-evolving Web standards to save our workday, right? Hmm? What did you say? Drop caps are still a mess? Browsers cannot make up their minds on how to align type? Well, they sure can't, but soon we'll be able to just declare `initial-letter` and call it a day.

Except that *soon* cannot come [quickly enough](https://caniuse.com/#feat=css-initial-letter).

So it seems that `initial-letter` is only available for Safari and iOS devices (or whatever their operating system gets to be called now), and it doesn't even support web fonts. Faced with this sad reality, some developers have tried to either find a way around, create custom HTML components, [splitting the first word and adding some ARIA markup to assist screen reader users](https://product.voxmedia.com/2019/6/17/18524029/the-ballad-of-drop-caps-and-design-systems), or just give up on drop caps entirely.

I quite like drop caps. When I built this website, I wanted to have them, but I didn't consider it sustainable to come up with an entire implementation just so I could parse each first paragraph and add a bunch of extra `div`s to it. Adding it all by hand was also not an option. Besides, less technical debt is more often than not the most *accessible* solution. So I kept hacking, via trial and error.

It seems that, across the latest versions of all major browsers I could test this on, they seemed to behave best when the drop cap's `font-size` is set in a percentage. Not `em`, not `rem`. A percentage. At least it's a relative unit… Meanwhile, Firefox on the desktop doesn't seem to know how to apply `line-height`, even though Chrome will be more than happy to comply. But add an adequate `margin-top` property and the cap will align with the rest of the text almost perfectly.

All in all, this is what I came up with.

```css
p:first-of-type:first-letter {
  float: left;
  margin-right: 0.25rem;

  /* Caution: here be magic numbers. */
  font-size: 480%; /* The most harmonious approach for major browsers  */
  margin-top: .7rem; /* Drop cap size works immediately on desktop FF */
  line-height: 0.5em; /* Desktop FF seems to not know what to do with this value, but it helps with Chrome */

  /* And now let's pray that all browsers implement this as soon as possible: */
  -webkit-initial-letter: 3;
  initial-letter: 3;
}
```

I hope it might be useful to you as well.

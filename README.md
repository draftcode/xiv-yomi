# FF14 難読アイテム

## Background

FFXIV uses Kanji characters for item names. These are used in an unusual way,
and even native Japanese speakers cannot tell how to read them. This is not only
a problem at reading, but also when writing Japanese IMEs cannot convert them.
These result in difficulties in searching items as we cannot read nor write them
in an easy way.

This repository provides guessed readings for those items. This enables us
to create a dictionary for IMEs or use roman-character incremental search like
[Migemo](http://0xcc.net/migemo/).

## Approach

The item names were extracted from Lodestone, and filtered out whether it
contains a Kanji character (to be exact, checked if the name contains
`CJK_UNIFIED_IDEOGRAPHS`). After some segmentations based on the Unicode
code blocks, exported the Kanji character sequences, manually assign the
readings, and reassemble the whole item name. This conversion and manually
assigned readings are available in `python/yomi.py`.

## Alternatives Considered

### Use Kakasi etc.

Kakasi would be most popular way to get Japanese sentence's readings. However,
as stated earlier, FFXIV item names uses Kanji characters in unconventional way
and they are not usually in any dictionaries. This makes otherwise effective
ways ineffective for this purpose.

### Convert to Romaji

The readings are represented in Hiragana, but this could have been Romaji. It
turns out that there are wide variety of Romaji combinations, and using
Hiaragana is much stable to deal with the ambiguity. Whether using Hiragana or
Katakana is an arbitrary choice and there would be no significant difference.

## License

As for the item names, they are part of FFXIV and (if these item names are
copyrightable, IANAL) they are copyrighted by SQUARE ENIX CO., LTD..

If other parts are considered to be copyrightable, they are licensed under [CC0
1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/). From the
author's point of view, it's not clear which part is SQUARE ENIX CO., LTD.'s
copyrighted material and which part can be considered to be the author's. The
intention here is if there is a material that is considered as not copyrighted
by SQUARE ENIX CO, LTD., that part can be considered as CC0. This way, if
somebody wants to reuse the materials provided here, no attribution needed and
it should be enough to put notice for SQUARE ENIX Co, LTD.'s per [Materials
Usage License](https://support.na.square-enix.com/rule.php?id=5382&tag=authc).
Again, I'm not a lawyer and this is not legal advice.

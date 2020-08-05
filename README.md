Use example:
1) Run ```npm i```
2) Run ```npm start```
3) Open generated .pdf

Bug description:
When I using "Reach Text" possibility sometimes i catch bug with hyphenation of long words. Looks like pdfkit lib has not reliable calculations.
It is very similar to the fact that the library is trying to transfer a word to the next line and absolutely sure that it completely fits in the next line. But this is not right.
It reproducing in specific word length because if I paste more longest word than in example - lib works break it right.

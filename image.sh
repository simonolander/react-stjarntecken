imgcat girl-sketch.jpg
convert girl-sketch.jpg -fx '(r+g+b)/3' temp.png
imgcat temp.png
convert temp.png -fuzz 25% -trim temp.png
imgcat temp.png
convert temp.png -fuzz 25% -opaque white temp.png
imgcat temp.png
convert temp.png -negate temp.png
imgcat temp.png
convert temp.png -alpha Off temp.png -compose CopyOpacity -composite PNG32:temp.png
imgcat temp.png

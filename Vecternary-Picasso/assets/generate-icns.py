# Original author can be found at https://gist.github.com/adriansr/1da9b18a8076b0f8a977a5eea0ae41ef
# must have svg2png (npm package) command line tool installed
# and on $PATH

import os
import sys
import subprocess

sizes = {
    "16": "16x16",
    "32": "16x16@2x",
    "32": "32x32",
    "64": "32x32@2x",
    "128": "128x128",
    "256": "128x128@2x",
    "256": "256x256",
    "512": "256x256@2x",
    "512": "512x512",
    "1024": "512x512@2x",
}

files = ["icon.svg"]
for svg in files:
    print("Processing {}...".format(svg))
    base = svg.replace(".svg", "")
    iconset = "{}.iconset".format(base)
    os.system("mkdir -p ./icons/{}".format(iconset))
    for params in sizes:
        size = params
        label = sizes[size]
        command = "svg2png -w {} -h {} {} ./icons/{}/icon_{}.png".format(
            size, size, svg, iconset, label
        )
        print(command)
        os.system(command)

# iconutil -c icns "/icons/$ICONSET" || true
# rm -rf "$ICONSET"

from PIL import Image
import base64
import os
from os import path
from io import BytesIO
import re

HOST_PATH=path.dirname(path.dirname(path.abspath(__file__)))
README_FILE=path.join(HOST_PATH,"readme.md")
buffer=BytesIO()

def getCompressBase64(filePath):
    im=Image.open(filePath)
    percent=1
    im=im.resize(
        (int(im.size[0]*percent),
        int(im.size[1]*percent))
    )
    buffer=BytesIO()
    im.save(buffer,format="PNG",optimize=True)
    str_b64=str(base64.b64encode(buffer.getvalue()),"utf8")
    buffer.close()
    del buffer
    return str_b64


with open(README_FILE,"r",encoding="utf8") as f:
    readmeContent=f.read()

def appendToReadme(name,content):
    global readmeContent
    readmeContent=re.sub("\["+name+"\].*","",readmeContent)
    readmeContent=readmeContent+f"\n[{name}]: data:image/png;base64,{content}"


originB64=getCompressBase64(
    path.join(HOST_PATH,"static/md-origin.png")
)
renderB64=getCompressBase64(
    path.join(HOST_PATH,"static/md-render.png")
)

appendToReadme("render_img",renderB64)
appendToReadme("origin_img",originB64)

if readmeContent:
    with open(README_FILE,"w",encoding="utf8") as f:
        f.write(readmeContent)


import re
import os

path = "../doenerpalast/lib/restaurant.ts"

if os.path.exists(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    social_block_old = r"""  socialMedia: {
    instagram: "https://instagram.com/doenerpalast.neckarsulm",
    facebook: "https://facebook.com/doenerpalastneckarsulm",
    tiktok: "https://tiktok.com/@doenerpalast.neckarsulm",
  },"""

    social_block_new = """  socialMedia: {
    instagram: "https://instagram.com/doenerpalast.neckarsulm",
    facebook: "https://facebook.com/doenerpalastneckarsulm",
    tiktok: "https://tiktok.com/@doenerpalast.neckarsulm",
    hidden: {
      instagram: false,
      facebook: false,
      tiktok: false,
    },
    titleHidden: false,
  },"""
  
    content = content.replace(social_block_old, social_block_new)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Cleaned up socialMedia: " + path)


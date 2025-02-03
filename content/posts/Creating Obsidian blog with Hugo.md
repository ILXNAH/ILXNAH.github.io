---
date: 2025-01-28
draft: false
tags:
  - obsidian
  - hugo
  - networkchuck
sticker: emoji//1f6e0-fe0f
MoC: "[[posts]]"
aliases:
  - Creating Obsidian blog with Hugo
title: Creating Obsidian blog with Hugo
---
Following a [tutorial video from NetworkChuck](https://www.youtube.com/watch?v=dnE7c0ELEH8), and then freestyling it to GitHub Pages.

>"We only know what we make."
## Battle Plan
- Using [Obsidian.md](https://obsidian.md/) for taking notes - simply "type out the blog"
- Turn it into HTML code, aka "make it code" using [Hugo](https://themes.gohugo.io/): a tool to convert .md files into a website code
- Ship the code off/push site to [GitHub](https://github.com/)
- I decided not to use Hostinger (like Chuck did) but was playing around with other ways of deployment on GitHub Pages (there are several different options and I'll share the simplest one)

I'll be setting this up on my Wins PC, but if you need Linux/Mac guidance, Chuck got those differences covered in [his](https://blog.networkchuck.com/posts/my-insane-blog-pipeline/) documentation. For the sake of sanity, I'm keeping my email/username/paths within the commands, i.e. don't forget to change them. 
1. **Install everything**: 
	- [Obsidian](https://obsidian.md/download), [Terminal](https://apps.microsoft.com/detail/9n0dx20hk701?hl=en-US&gl=US)/PowerShell, [VS Code](https://code.visualstudio.com/download), [Golang](https://go.dev/dl/), [Python 3](https://www.python.org/downloads/), [Git](https://git-scm.com/downloads) and [Hugo](https://gohugo.io/installation/) (add the .exe into your program location, e.g. Program Files, and also into PATH)
2.  Create a `posts` folder within your Obsidian Workspace for your blog articles
3. Within this folder, start a new note (that will be your first blog post)
4. Double-check correct installations via the `version` flagged commands:
  `go version`, `git --version`, `hugo version`, `python --version` etc.
5. Navigate to your desired directory for storing blog files on your machine, e.g.: `cd C:\Users\ilona\Documents\`
6. Create a new folder for Hugo blog and set up git: `hugo new site ILXNAH.github.io` > `cd .\ILXNAH.github.io` > `git init` > `git config --global user.name "ILXNAH"` > `git config --global user.email "ILXNAH@tutanota.com"`
7. Navigate to [Hugo Themes](https://themes.gohugo.io/) and pick a theme to install for your blog.
8. Select installation option for a specific theme, e.g. look here for [Terminal theme](https://themes.gohugo.io/themes/hugo-theme-terminal/). I used local installation to avoid any fuss when transferring between repos. 
	`git clone https://github.com/panr/hugo-theme-terminal.git themes/terminal`
9. Edit the config file called `hugo.toml` - it needs to match the theme.
	- Terminal theme has a text file at the bottom of the page [which you can copy it from](https://themes.gohugo.io/themes/hugo-theme-terminal/#how-to-configure) (**leave out modules part at the bottom**) and paste into your `hugo.toml`
	- Via CLI, you can open it with command `notepad hugo.toml` like Chuck, or `npp hugo.toml` like myself (that's another custom path), or use VS Code with `code hugo.toml`
10. Next, run your Hugo server preview with `hugo serve`
	- Take a look at [//localhost:1313/](//localhost:1313/) > Ctrl+C to cancel website preview
### Syncing Obsidian to Hugo
- posts folder will be syncing from `Obsidian Vault/posts` into `/ILXNAH.github.io/content/posts`
- `cd content` > `mkdir posts` (this folder will be synced with Obsidian source folder) with this command: 
	```
	robocopy "C:\Users\ilona\Documents\obsidian\posts" "C:\Users\ilona\Documents\ILXNAH.github.io\content\posts" /mir
	```
- `hugo serve` to preview blog with imported posts > Ctrl+C to exit the preview
### Using Front Matter in Obsidian
- set up metadata via Obsidian properties:
	- you can use a variation of community plugins,
		- I'm using [make.md](https://www.make.md/), Chuck is using [Templater](https://github.com/SilentVoid13/Templater)...
	- make sure the draft property is unchecked, so the post is displayed
		- `hugo serve -D` flagged command will include posts in draft mode
	- ideally, create a template with desired properties for your blog posts
- run robocopy again with added post properties in your source files
- `hugo serve` to verify the metadata is showing > exit preview
### Fixing image attachments using a Python script
- in your blog dir, `cd static` > `mkdir images` > `cd ..` > `code images.py`
- insert code, make sure to edit all three paths, and save:
```python
import os
import re
import shutil

# Paths (using raw strings to handle Windows backslashes correctly)
posts_dir = r"C:\Users\ilona\Documents\ILXNAH.github.io\content\posts"
attachments_dir = r"C:\Users\ilona\Documents\obsidian\Attachments"
static_images_dir = r"C:\Users\ilona\Documents\ILXNAH.github.io\static\images"

# Step 1: Process each markdown file in the posts directory
for filename in os.listdir(posts_dir):
    if filename.endswith(".md"):
        filepath = os.path.join(posts_dir, filename)

        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()

        # Step 2: Find all image links in the format ![Image Description](/images/Pasted%20image%20...%20.png)
        images = re.findall(r'\[\[([^]]*\.png)\]\]', content)

        # Step 3: Replace image links and ensure URLs are correctly formatted
        for image in images:
            # Prepare the Markdown-compatible link with %20 replacing spaces
            markdown_image = f"![Image Description](/images/{image.replace(' ', '%20')})"
            content = content.replace(f"[[{image}]]", markdown_image)

            # Step 4: Copy the image to the Hugo static/images directory if it exists
            image_source = os.path.join(attachments_dir, image)
            if os.path.exists(image_source):
                shutil.copy(image_source, static_images_dir)

        # Step 5: Write the updated content back to the markdown file
        with open(filepath, "w", encoding="utf-8") as file:
            file.write(content)

print("Markdown files processed and images copied successfully.")
```
- added image for testing purposes of the part of the script we just did:
	![Image Description](/images/Pasted%20image%2020250131130510.png)
### Pushing code into GitHub
- create GitHub repo with name `ILXNAH.github.io` and set visibility to public
- you will need an SSH key, which you can generate with `ssh-keygen -t rsa -b 4096 -C "ILXNAH@tutanota.com"` if you don't have one yet
- this keypair (public and private key) will be created in dir `~/.ssh`
- within that dir, to add pubkey to GitHub, copy its content displayed via `cat .\id_rsa.pub`
- GitHub > Settings > SSH > New key > paste in there
- test that it's working on your PC with cmd `ssh -T git@github.com`
- in your blog dir, `git remote add origin git@github.com:ILXNAH/ILXNAH.github.io.git` to define the remote repo (the one you created on GitHub) aka add it to your local setup > `git branch -M main`
- type `hugo` to make sure website has been built
- `git add .` to add all changes
- `git commit -m "First commit"` to commit those changes (locally)
- `git push -u origin main` to push from local to remote repo
	(specified is: first, name of your remote repo `origin`, then branch name `main`)
###### Deploy on GitHub profile Pages
1. on repo website, go to Settings > Pages > Source: GitHub Actions
2. in your local repo, add folder "`.github`"
3. within there, create a folder called "`workflows`"
4. within there, create a "`hugo.yaml`" file
5. copy workflow code into `hugo.yaml` from [Hugo's official documentation](https://gohugo.io/hosting-and-deployment/hosting-on-github/)
6. `git add .` > `git commit -m "github actions"` > `git push`
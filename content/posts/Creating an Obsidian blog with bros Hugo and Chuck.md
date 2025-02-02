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
  - Creating a blog
---
Following a [tutorial video from NetworkChuck](https://www.youtube.com/watch?v=dnE7c0ELEH8)

'We only know what we make'
**Hugo** = a tool to convert .md into website code
	- prereqs: see list below
## Battle Plan!
- Using Obsidian for taking notes - simply "type out the blog"
- Turn it into HTML code, aka "make it code" using a tool called **Hugo**
- Ship the code off/push site to GitHub
- I decided not to use Hostinger but am playing around with other ways of deployment.

I'll be setting this up on my Wins PC, but if you need Linux/Mac guidance, Chuck got those differences covered in [his](https://blog.networkchuck.com/posts/my-insane-blog-pipeline/) documentation. For the sake of sanity, I'm keeping my email/username/paths within the commands, i.e. don't forget to change them. 
1. **Install everything**: 
	- Obsidian, Windows Terminal, Visual Studio Code, WSL 2, Golang, Python 3, Git and Hugo (add the .exe into your own program location - like Program Files - and also in Windows into PATH)
2.  Create a `posts` folder within your Obsidian Workspace for your blog articles
3. Within this folder, start a new note (that will be your first blog post)
4. Double-check correct installations via the `version` flagged commands:
  `go version`, `git --version`, `hugo version`, `python --version` etc.
5. Navigate to your desired directory for storing blog files on your machine, e.g.: `cd C:\Users\ilona\Documents\`
6. Create a new folder for Hugo blog and set up git: `hugo new site optimeow` > `cd .\optimeow` > `git init` > `git config --global user.name "ILXNAH"` > `git config --global user.email "ILXNAH@tutanota.com"`
7. Navigate to [Hugo Themes](https://themes.gohugo.io/) and pick a theme to install for your blog.
8. Select option "Install theme as a submodule", e.g. for [Terminal theme](https://themes.gohugo.io/themes/hugo-theme-terminal/) it looks like this:
  `git submodule add -f https://github.com/panr/hugo-theme-terminal.git themes/terminal`
9. Edit config: the file is called `hugo.toml` and it needs to match the theme
	- Terminal theme has a text file at the bottom of the page which you can copy it from (leave out module and module.imports at the bottom) and paste into your `hugo.toml`
	- Via CLI, you can open it with program cmd `notepad hugo.toml` like Chuck, or `npp hugo.toml` like myself (that's custom though)
10. Next, run your Hugo server preview with `hugo serve`
	- Take a look at [//localhost:1313/](//localhost:1313/) > Ctrl+C to cancel website preview
### Syncing Obsidian to Hugo
- posts folder will be syncing from `Obsidian Vault/posts` into `/blogname/content/posts`
- `cd content` > `mkdir posts` (this new folder will be synced with Obsidian source folder) with this command: `robocopy "C:\Users\ilona\Documents\my_second_brain\posts" "C:\Users\ilona\Documents\optimeow\content\posts" /mir`
- `hugo serve` to preview blog with imported posts > Ctrl+C the preview again
### Using Frontmatter in Obsidian
- set up metadata via Obsidian properties
	- you can use a variation of community plugins
		- I'm using [make.md](https://www.make.md/), Chuck is using **Templater**
	- make sure the draft property is unchecked, so the post is displayed
		- `hugo server -D` command will publish any posts in draft mode inclusively
	- ideally create a template with desired properties for your blog posts
- run robocopy again with added post properties in source .md
- `hugo serve` to see if properties OK > exit preview
### Fixing image attachments using a Python script
- in your Hugo blog dir, `cd static` > `mkdir images` > `cd ..` > `code images.py`
- insert code, make sure to edit all three paths, and save:
```python
import os
import re
import shutil

# Paths (using raw strings to handle Windows backslashes correctly)
posts_dir = r"C:\Users\ilona\Documents\optimeow\content\posts"
attachments_dir = r"C:\Users\ilona\Documents\my_second_brain\Attachments"
static_images_dir = r"C:\Users\ilona\Documents\optimeow\static\images"

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
- create an account, log in, create a repo for your blog 
- you will need an SSH key, which you can generate with `ssh-keygen -t rsa -b 4096 -C "ILXNAH@tutanota.com"` if you don't have one yet
- this keypair (public and private key) will be created in dir `~/.ssh`
- within that dir, to add pubkey to GitHub, copy its content displayed via `cat .\id_rsa.pub`
- GitHub > Settings > SSH > New key > paste in there
- test that it's working on your PC with cmd `ssh -T git@github.com`
- in your blog dir, `git remote add origin git@github.com:ILXNAH/optimeow.git` to define the remote repo (the one you created on GitHub) aka add it to your local setup
- type cmd `hugo` to make sure our website has been built
- `git add .` to add all files in current dir to our repo
- `git commit -m "First commit"` to commit those changes (locally)
- `git push -u origin main` to push from local to remote repo
	(specified is: first, name of your remote repo `origin`, then branch name `main`)
##### Publishing for free to GitHub Pages 
- following this [guide by @Magstherdev](https://medium.com/@magstherdev/github-pages-hugo-86ae6bcbadd) and [official guide on Hugo's site](https://gohugo.io/hosting-and-deployment/hosting-on-github/)
- `hugo -d docs` generates site into a dir `docs` (inside blog dir), which we need for (GitHub) Pages, i.e. we don't need the `public` folder
- open `code hugo.toml` and add this line under line 6:
  ```hugo.toml
  publishDir = "docs"
  ```
- with this, you created a `docs` dir which replaces `public` folder's purpose (even in config)
- edit blog > robocopy > images.py > hugo > hugo serve > add, commit, push
##### Some more tweaks and we're almost done
- in `hugo.toml`, when using Pages from `/docs`, we also need to edit URL configuration in Hugo's config file (line 1): as below, replace with your own Pages link
	```hugo.toml
	baseurl = "https://ilxnah.github.io/optimeow/"
	```
##### GitHub profile pages and project pages
- the key difference is, when you're using a project repo, you generate site from `docs`, but with profile pages, the website is generated directly in the root of your repo
- i.e. you don't need `docs`, but you can generate your content directly into blog dir with `hugo -d .` or by modifying the publishDir parameter inside of `hugo.toml`
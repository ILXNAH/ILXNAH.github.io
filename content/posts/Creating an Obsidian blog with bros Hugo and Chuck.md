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

- **Hugo:** 
	- tool to convert .md into website code
	- prereqs: Git (for GitHub code repo), Golang (from Google)
		- check install with git version, go version

## Battle Plan!
1. Using Obsidian for taking notes - simply "type out the blog"
2. Turn it into HTML code, aka "make it code" using a tool called **Hugo**
3. Ship the code off/push site to GitHub
4. Web hook configured to send a notification to Hostinger, 
   telling it to pull down the latest version of our website and host it there.

I will be setting this up on my Windows machine, but if you need Linux/Mac guidance, Chuck got those differences covered in [his documentation](https://blog.networkchuck.com/posts/my-insane-blog-pipeline/) as well. 
For the sake of my own sanity, I am keeping my contact and usernames everywhere within the commands, so don't forget to change them. 

- Install **everything**: Obsidian, Windows Terminal, Visual Studio Code, WSL 2, Golang, Python 3, Git and Hugo (add the .exe into your own program location - like Program Files - and also in Windows into PATH)
  a few days/weeks/months later...)
- Create a folder within your Obsidian Workspace for your blog `posts`
- Within this folder, start a new note (that will be your first future blog post)
- Double-check correct installations via the `version` flagged commands:
  `go version`
  `git version`
  `hugo version`
  ...
- Navigate to your desired directory for storing blog files on your machine, e.g.: 
  `cd C:\Users\ilona\Documents\`
- Create a new Hugo folder with command below, effectively naming it after your blog:
  `hugo new site optimeow`
- `cd .\optimeow`
- `git init`
- `git config --global user.name "ILXNAH"`
- `git config --global user.email "ILXNAH@tutanota.com"`
- Navigate to [Hugo Themes](https://themes.gohugo.io/) website and pick a theme you would like to install for your blog
- Select option "Install theme as a submodule", e.g. for [Terminal theme](https://themes.gohugo.io/themes/hugo-theme-terminal/) it looks like this:
  `git submodule add -f https://github.com/panr/hugo-theme-terminal.git themes/terminal`
- Configuration file is called `hugo.toml` and it needs to match the theme
- Terminal theme has a text file at the bottom of the page which you can copy it from (leave out module and module.imports at the bottom) and paste into your `hugo.toml`
- Via CLI, you can open it with programs `notepad hugo.toml` like Chuck, or `npp hugo.toml` like myself (that's also custom though), on Linux use nano etc. 
- Next, run your Hugo server preview with `hugo server -t terminal`
- Take a look at `//localhost:1313/`
- Ctrl+C to cancel preview

### Syncing Obsidian to Hugo
###### i renamed hugo site folder which was originally created with capitals, in case there's an issue.

- posts folder will be syncing from Obsidian Vault/posts into hugo/blogname/content/posts
- `cd content`
- `mkdir posts`
- this newly created **posts folder will be syncing** directly with obsidian source folder
- `robocopy "C:\Users\ilona\Documents\my_second_brain\posts" "C:\Users\ilona\Documents\optimeow\content\posts" /mir`
- `hugo server -t terminal` to start up Hugo and preview your blog

### Using Frontmatter in Obsidian
- set up metadata via Obsidian properties
	- you can use a variation of community plugins
		- I'm using **make.md**, Chuck is using **Templater**
	- make sure the draft property is unchecked, so the post is displayed on your blog when you're testing (I'm just putting this out here since I took long enough to realize, way longer than anyone ever should again)
		- if you run `hugo server -D`, it will also included any posts that are in draft mode
	- ideally, make and save a default template.md with the properties for your blog posts' new files already set up (you can later on hide the file, if you're also OCD like me:)
- Ctrl+C the website preview
- run robocopy again
- view and check, it worked!

### Fixing image attachments using a provided Python script
- in your hugo blog dir, `cd static`
- `mkdir images`
- `cd ..`
- `code images.py`
- insert code, make sure to edit all three paths to your own, and save:
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
###### Git push side note
- easy way to undo the **last** push if you make a mistake:
  `git push -f origin HEAD^:main`
- or view the history of the pushes with:
  `git reflog --grep-reflog=push origin/main`
- and then, you can reference an older push as well:
  `git push -f origin last_known_good_commit:branch_name`
###### Tracking empty folders in Git
- for e.g. `assets` folder in blog dir: `New-Item -Path "assets\.gitkeep" -ItemType "File"`
	- commit > push
### Publishing only `public` folder to its own GitHub branch
- create a new branch and copy desired `public` folder inside
- git subtree split --prefix public -b website-deploy 
- git push origin website-deploy:webhosting --force 
- git branch -D website-deploy
##### Publishing for free to GitHub Pages 
- following this [Medium guide by @Magstherdev](https://medium.com/@magstherdev/github-pages-hugo-86ae6bcbadd) and [official guide on Hugo's site](https://gohugo.io/hosting-and-deployment/hosting-on-github/)
- `hugo -d docs` creates a directory `docs` inside blog dir, which we need for (GitHub) Pages (instead of the `public` folder which Chuck uses)
- open `code hugo.toml` and add this line under line 6:
  ```hugo.toml
  publishDir = "docs"
  ```
- with `python3 -m http.server 8080 --directory docs` you can preview in there
	- when changing posts and do `robocopy` + `images.py` as mentioned previously, to reflect changes in the `docs` dir, you need to run cmd `hugo -d docs` and then preview w/ python as above
		- if you use cmd `hugo` without specified flag, it will update the default `public` folder as well as the `docs` folder (as configured in hugo.toml)
	- verified reflected changes via `ls` timestamp and compare preview with the one which should have now been on older version: 
	  `python3 -m http.server 8080 --directory public`
- **with this workflow you can:**
	- create `docs` directory which replaces `public` folder's purpose
	- edit blog > robocopy > images.py > hugo -d docs > commit and push out
	- keep the `public` folder "outdated" and use it for local development 
	- make sure when previewing to use different ports (to avoid cross-caching versions), e.g.:
		- Pages on [http://localhost:8080/](http://localhost:8080/)
		- dev on [http://localhost:8081/](http://localhost:8081/)
- let's push it to our GitHub repo: `git add .` > `git commit` > `git push`
##### Some more tweaks and we're almost done
- in `hugo.toml`, when using Pages from `/docs`, we also need to edit URL configuration in Hugo's config file (line 1): as below, replace with your own Pages link
	```hugo.toml
	baseurl = "https://ilxnah.github.io/optimeow/"
	```
- the config file for Pages version is just a copy called `hugo.github.toml`, which includes the additional URL defined as above
- I also kept the original `hugo.toml` without this definition for local testing purposes
#### Final Workflow:
- edit blog posts
- sync Obsidian into Hugo with `robocopy`
- run `images.py`
- local dev > regenerate static site:
	- `hugo -d public`
- local dev > preview: 
	- `python3 -m http.server 8081 --directory public`
- Pages > regenerate static site:
	- `hugo -d docs -c .\hugo.github.toml`
- Pages > preview won't work with content generated for live publish
- `git add .` > `git commit -m "Commit message"` > `git push`
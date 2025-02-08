---
title: Creating Obsidian blog with Hugo
draft: false
MoC: "[[Hugo Posts]]"
Date Created: 2025-01-28 08:20:38
Date Modified: 2025-02-08 19:30:29
tags:
  - obsidian
  - hugo
  - networkchuck
---
Following a [video from NetworkChuck](https://www.youtube.com/watch?v=dnE7c0ELEH8), then freestyling it to GitHub Pages.
>"We only know what we make."
##### Battle Plan
- Use [Obsidian.md](https://obsidian.md/) for note-taking
- Turn it into HTML code using [Hugo](https://themes.gohugo.io/) (a tool to convert .md files into a website)
- Ship the code off to [GitHub](https://github.com/)
- Be a rebel & deploy for free via [Pages](https://pages.github.com/) (instead of Hostinger)
###### Note
My setup is on my Windows PC, but if you need a guide for Linux/Mac, Chuck got those differences covered in [his](https://blog.networkchuck.com/posts/my-insane-blog-pipeline/) documentation. For the sake of sanity, I'm keeping my email/username/paths within the commands, i.e. don't forget to change them. 
#### Initial Installation
1. Install everything: [Obsidian](https://obsidian.md/download), [Terminal](https://apps.microsoft.com/detail/9n0dx20hk701?hl=en-US&gl=US)/PowerShell, [VS Code](https://code.visualstudio.com/download), [Golang](https://go.dev/dl/), [Python 3](https://www.python.org/downloads/), [Git](https://git-scm.com/downloads) and [Hugo](https://gohugo.io/installation/)
(add the .exe into your program location, e.g. Program Files, and also into PATH)
2. Create a `Hugo Posts` folder within your Obsidian Workspace for your blog articles
3. Within this folder, start a new note (that will be your first blog post)
4. Double-check correct installations via the `version` flagged commands:
  `go version`, `git --version`, `hugo version`, `python --version` etc.
5. Navigate to your desired directory for storing blog files on your machine, e.g.: `cd C:\Users\ilona\Documents\`
6. Create a new folder for Hugo blog and set up git: `hugo new site ILXNAH.github.io` > `cd .\ILXNAH.github.io` > `git init` > `git config --global user.name "ILXNAH"` > `git config --global user.email "ILXNAH@tutanota.com"`
7. Navigate to [Hugo Themes](https://themes.gohugo.io/) and pick a theme to install for your blog.
8. Select installation option for a specific theme, e.g. look here for [Terminal theme](https://themes.gohugo.io/themes/hugo-theme-terminal/). I used local installation to avoid any fuss when transferring between repos. 
	`git clone https://github.com/panr/hugo-theme-terminal.git themes/terminal`
9. Edit the config file called so that it matches the installed theme; Terminal theme has a [config file](https://themes.gohugo.io/themes/hugo-theme-terminal/#how-to-configure) on its page which you can copy (leave out modules) and paste into `hugo.toml`.
10. Run Hugo server preview with `hugo serve`
	- Take a look at [//localhost:1313/](//localhost:1313/) > Ctrl+C to cancel website preview
#### Syncing Obsidian to Hugo
- posts folder will be syncing from `Obsidian Vault/Hugo Posts` into `/ILXNAH.github.io/content/posts`
- `cd content` > `mkdir posts` (this folder will be synced with Obsidian source folder) with this command: 
	```
	robocopy "C:\Users\ilona\Documents\obsidian\Hugo Posts" "C:\Users\ilona\Documents\ILXNAH.github.io\content\posts" /mir
	```
- `hugo serve` to preview blog with imported posts > Ctrl+C to exit the preview
#### Using Front Matter in Obsidian
- set up metadata via Obsidian properties:
	- you can use many community plugins, e.g. [make.md](https://www.make.md/) or[Templater](https://github.com/SilentVoid13/Templater),
	- make sure the draft property is unchecked, so the post is displayed
		- `hugo serve -D` flagged command will include posts in draft mode
	- ideally, create a template with desired properties for your blog posts
- run robocopy again with added post properties in your source files
- `hugo serve` to verify the metadata is showing > exit preview
#### Fixing image attachments using a Python script
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
        images = re.findall(r'\[\[([^]]*\.(?:png|jpg|jpeg))\]\]', content)

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
#### Pushing code into GitHub
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
#### Deploying to GitHub Pages
1. on repo website, go to Settings > Pages > Source: GitHub Actions
2. in your local repo, add folder "`.github`"
3. within there, create a folder called "`workflows`"
4. within there, create a "`hugo.yaml`" file
5. copy workflow code into `hugo.yaml` from [Hugo's official documentation](https://gohugo.io/hosting-and-deployment/hosting-on-github/)
6. `git add .` > `git commit -m "github actions"` > `git push`
##### Publishing Workflow
1. `robocopy "C:\Users\ilona\Documents\obsidian\Hugo Posts" "C:\Users\ilona\Documents\ILXNAH.github.io\content\posts" /mir`
2. `python images.py`
3. `hugo`
4. (to view - can be skipped) `hugo serve --noHTTPCache`
	- use this flag to avoid site refresh being stuck due to cache (if you're editing in real-time)
	- you can create alias: `hss='hugo serve --noHTTPCache'`
5. `git add .` > `git commit -m "change"` > `git push`
#### Final automation script in PowerShell
The below script automates the publishing workflow steps above (apart from preview):
```powershell
# Set variables for Obsidian to Hugo copy
$sourcePath = "C:\Users\ilona\Documents\obsidian\Hugo Posts"
$destinationPath = "C:\Users\ilona\Documents\ILXNAH.github.io\content\posts"

# Set Github repo 
$myrepo = "git@github.com:ILXNAH/ILXNAH.github.io.git"

# Set error handling
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

# Change to the script's directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $ScriptDir

# Check for required commands
$requiredCommands = @('git', 'hugo')

# Check for Python command (python or python3)
if (Get-Command 'python' -ErrorAction SilentlyContinue) {
    $pythonCommand = 'python'
} elseif (Get-Command 'python3' -ErrorAction SilentlyContinue) {
    $pythonCommand = 'python3'
} else {
    Write-Error "Python is not installed or not in PATH."
    exit 1
}
foreach ($cmd in $requiredCommands) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        Write-Error "$cmd is not installed or not in PATH."
        exit 1
    }
}

# Step 1: Check if Git is initialized, and initialize if necessary
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..."
    git init
    git remote add origin $myrepo
} else {
    Write-Host "Git repository already initialized."
    $remotes = git remote
    if (-not ($remotes -contains 'origin')) {
        Write-Host "Adding remote origin..."
        git remote add origin $myrepo
    }
}

# Step 2: Sync posts from Obsidian to Hugo content folder using Robocopy
Write-Host "Syncing posts from Obsidian..."
if (-not (Test-Path $sourcePath)) {
    Write-Error "Source path does not exist: $sourcePath"
    exit 1
}
if (-not (Test-Path $destinationPath)) {
    Write-Error "Destination path does not exist: $destinationPath"
    exit 1
}

# Use Robocopy to mirror the directories
$robocopyOptions = @('/MIR', '/Z', '/W:5', '/R:3')
$robocopyResult = robocopy $sourcePath $destinationPath @robocopyOptions
if ($LASTEXITCODE -ge 8) {
    Write-Error "Robocopy failed with exit code $LASTEXITCODE"
    exit 1
}

# Step 3: Process Markdown files with Python script to handle image links
Write-Host "Processing image links in Markdown files..."
if (-not (Test-Path "images.py")) {
    Write-Error "Python script images.py not found."
    exit 1
}

# Execute the Python script
try {
    & $pythonCommand images.py
} catch {
    Write-Error "Failed to process image links."
    exit 1
}

# Step 4: Build the Hugo site
Write-Host "Building the Hugo site..."
try {
    hugo
} catch {
    Write-Error "Hugo build failed."
    exit 1
}

# Step 5: Add changes to Git
Write-Host "Staging changes for Git..."
$hasChanges = (git status --porcelain) -ne ""
if (-not $hasChanges) {
    Write-Host "No changes to stage."
} else {
    git add .
}

# Step 6: Commit changes with a dynamic message
$commitMessage = "Blog Update on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$hasStagedChanges = (git diff --cached --name-only) -ne ""
if (-not $hasStagedChanges) {
    Write-Host "No changes to commit."
} else {
    Write-Host "Committing changes..."
    git commit -m "$commitMessage"
}

# Step 7: Push all changes to the main branch
Write-Host "Pushing to GitHub Main..."
try {
    git push origin main
} catch {
    Write-Error "Failed to push to Main branch."
    exit 1
}

Write-Host "All done! Site synced, processed, committed, built, and deployed."
```
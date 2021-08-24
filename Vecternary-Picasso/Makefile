# ANSI escape sequences for colors
COLOR = \033[
BOLD = 1;
MAGENTA = 35m
CYAN = 36m
GREEN = 32m
END_COLOR = \033[0m
ENDL = \n

# Unicode symbols for prettier output
# •
INFO = \u2022
# (✓)
DONE = (\u2713)

help:
	@echo Options for make:
	@printf "%b" "\t $(COLOR)$(CYAN) make installdeps $(END_COLOR)$(ENDL)";
	@printf "%b" "\t $(COLOR)$(CYAN) make build $(END_COLOR)$(ENDL)";
	@printf "%b" "\t $(COLOR)$(CYAN) make serve $(END_COLOR)$(ENDL)"
	@printf "%b" "\t $(COLOR)$(CYAN) make dist $(END_COLOR)$(ENDL)"
	@printf "%b" "\t $(COLOR)$(CYAN) make bundle $(END_COLOR)$(ENDL)"
installdeps:
	@printf "%b" "$(COLOR)$(BOLD)$(MAGENTA)$(INFO) Installing dependencies... $(END_COLOR)$(ENDL)"
	@npm i -g tailwindcss-cli@latest
	@npm i -g live-server@latest
	@npm i -g inline-assets@latest
	@printf "%b" "$(COLOR)$(GREEN)$(DONE) All dependencies installed successfully! $(END_COLOR)$(ENDL)"
build:
	@printf "%b" "$(COLOR)$(BOLD)$(MAGENTA)$(INFO) Preparing CSS assets... $(END_COLOR)$(ENDL)"
	@tailwindcss-cli -i ./css/raw/tailwind.css -o ./css/build/tailwind.output.css
	@printf "%b" "$(COLOR)$(GREEN)$(DONE) Compilation finished successfully! $(END_COLOR)$(ENDL)"

serve:
	@printf "%b" "$(COLOR)$(BOLD)$(CYAN)$(INFO) Starting live development server... $(END_COLOR)$(ENDL)"
	@live-server

dist:
	@printf "%b" "$(COLOR)$(BOLD)$(MAGENTA)$(INFO) Bundling CSS assets... $(END_COLOR)$(ENDL)"
	@printf "%b" "$(COLOR)$(BOLD)$(GREEN)$(INFO) Tree-shaking unused styles... $(END_COLOR)$(ENDL)"
	@export NODE_ENV='production' && tailwindcss-cli -i ./css/raw/tailwind.css -o ./css/build/tailwind.output.css
	@printf "%b" "$(COLOR)$(BOLD)$(GREEN)$(DONE) Done! CSS assets are now optimized for production. $(END_COLOR)$(ENDL)"
bundle:
	@printf "%b" "$(COLOR)$(BOLD)$(MAGENTA)$(INFO) Bundling assets into one file... $(END_COLOR)$(ENDL)"
	@inline-assets ./index.html ./app/src/index.html
	@printf "%b" "$(COLOR)$(BOLD)$(GREEN)$(INFO) Running \`cargo build --release\` in directory 'app'... $(END_COLOR)$(ENDL)"
	@make -C app build
	@printf "%b" "$(COLOR)$(GREEN)$(DONE) Done! Compiled app at ./app/target/release/app $(END_COLOR)$(ENDL)"

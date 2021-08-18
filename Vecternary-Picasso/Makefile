# ANSI escape sequences for colors
COLOR = \033[
BOLD = 1;
MAGENTA = 35m
CYAN = 36m
GREEN = 32m
END_COLOR = \033[0m
ENDL = \n

help:
	@echo Options for make:
	@printf "%b" "\t $(COLOR)$(CYAN) make build $(END_COLOR)$(ENDL)";
	@printf "%b" "\t $(COLOR)$(CYAN) make serve $(END_COLOR)$(ENDL)"
	@printf "%b" "\t $(COLOR)$(CYAN) make dist $(END_COLOR)$(ENDL)"
	@printf "%b" "\t $(COLOR)$(CYAN) make bundle $(END_COLOR)$(ENDL)"
build:
	@printf "%b" "$(COLOR)$(BOLD)$(MAGENTA)• Preparing CSS assets... $(END_COLOR)$(ENDL)"
	@npx tailwindcss-cli@latest -i ./css/raw/tailwind.css -o ./css/build/tailwind.output.css
	@printf "%b" "$(COLOR)$(GREEN)(✓) Compilation finished successfully! $(END_COLOR)$(ENDL)"

serve:
	@printf "%b" "$(COLOR)$(BOLD)$(CYAN)• Starting live development server... $(END_COLOR)$(ENDL)"
	@npx live-server

dist:
	@printf "%b" "$(COLOR)$(BOLD)$(MAGENTA)• Bundling CSS assets... $(END_COLOR)$(ENDL)"
	@printf "%b" "$(COLOR)$(BOLD)$(GREEN)• Tree-shaking unused styles... $(END_COLOR)$(ENDL)"
	@export NODE_ENV='production' && npx tailwindcss-cli@latest build ./css/raw/tailwind.css -o ./css/build/tailwind.output.css
	@printf "%b" "$(COLOR)$(BOLD)$(GREEN)(✓) Done! Preparing live server to serve assets. $(END_COLOR)$(ENDL)"
	@read -p "Press ENTER to start server, or CTRL C to stop: "
	@npx live-server
bundle:
	@printf "%b" "$(COLOR)$(BOLD)$(MAGENTA)• Bundling assets into one file... $(END_COLOR)$(ENDL)"
	@npx html-onefile ./index.html ./app/src/index.html
	@printf "%b" "$(COLOR)$(BOLD)$(GREEN)• Running \`cargo build --release\` in directory 'app'... $(END_COLOR)$(ENDL)"
	@make -C app build
	@printf "%b" "$(COLOR)$(GREEN)(✓) Done! Compiled app at ./app/target/release/app $(END_COLOR)$(ENDL)"

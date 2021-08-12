use web_view::*;

fn main() {
    web_view::builder()
        .title("Vecternary Picasso")
        .content(Content::Html(include_str!("index.html")))
        .size(1600, 860)
        .resizable(true)
        .debug(true)
        .user_data(())
        .invoke_handler(|_webview, _arg| Ok(()))
        .run()
        .unwrap();
}

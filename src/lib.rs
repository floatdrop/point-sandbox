use wasm_bindgen::prelude::*;
use web_sys::console;


// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


// This is like the `main` function, except for JavaScript.
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // This provides better error messages in debug mode.
    // It's disabled in release mode so it doesn't bloat up the file size.
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    // Your code goes here!
    console::log_1(&JsValue::from_str("Hello world!"));

    Ok(())
}

// Converts numeric degrees to radians
fn to_rad(grad: f64) -> f64 {
    grad * std::f64::consts::PI / 180.0
}

static R: f64 = 6371.0; // km


#[wasm_bindgen]
pub fn distance(x1: f64, y1: f64, x2: f64, y2: f64) -> Result<f64, JsValue> {
    let d_lat = to_rad(y2 - y1);
    let d_lon = to_rad(x2 - x1);
    let lat1 = to_rad(y1);
    let lat2 = to_rad(y2);

    let a = (d_lat/2.0).sin() * (d_lat/2.0).sin() + (d_lon/2.0).sin() * (d_lon/2.0).sin() * lat1.cos() * lat2.cos();
    let c = 2.0 * (a.sqrt()).atan2((1.0-a).sqrt());

    Ok(R * c)
}
use tauri::{State};
use serde_json::json;
use cochavira_core::api::{CochaviraEngine, EngineRequest, EngineResponse};
use std::sync::Mutex;

pub struct AppState {
    pub engine: Mutex<CochaviraEngine>,
}

pub fn sv_analyze_impl(source: String, state: State<AppState>) -> Result<String, String> {
    let mut engine = state.engine.lock().unwrap();

    match engine.request(EngineRequest::AnalyzeSv(source)) {
        EngineResponse::Semantic(res) => {
            let tokens_json: Vec<serde_json::Value> = res
                .tokens
                .iter()
                .map(|t| json!({ "kind": t.kind, "span": [t.span.0, t.span.1] }))
                .collect();
            serde_json::to_string(&tokens_json).map_err(|e| e.to_string())
        }
        EngineResponse::SemanticError => Err("Semantic analysis failed".into()),
        other => Err(format!("Unexpected engine response: {:?}", other)),
    }
}

use cochavira_core::api::*;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn keyword_and_identifier() {
        let code = "module test;";
        let mut engine = CochaviraEngine::new_gpu().unwrap();

        match engine.request(EngineRequest::AnalyzeSv(code.to_string())) {
            EngineResponse::Semantic(res) => {
                assert!(res.tokens.iter().any(|t| t.kind == "keyword"));
                assert!(res.tokens.iter().any(|t| t.kind == "identifier"));
            }
            other => panic!("unexpected response: {:?}", other),
        }
    }

    #[test]
    fn numbers_and_ops() {
        let code = "a = 42;";
        let mut engine = CochaviraEngine::new_gpu().unwrap();

        match engine.request(EngineRequest::AnalyzeSv(code.to_string())) {
            EngineResponse::Semantic(res) => {
                assert!(res.tokens.iter().any(|t| t.kind == "number"));
            }
            other => panic!("unexpected response: {:?}", other),
        }
    }

    #[test]
    fn comment() {
        let code = "// hello\nmodule x;";
        let mut engine = CochaviraEngine::new_gpu().unwrap();

        match engine.request(EngineRequest::AnalyzeSv(code.to_string())) {
            EngineResponse::Semantic(res) => {
                assert!(res.tokens.iter().any(|t| t.kind == "comment"));
            }
            other => panic!("unexpected response: {:?}", other),
        }
    }
}

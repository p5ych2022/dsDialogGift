package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// Message 定义前端和后端交互的数据结构，可以根据需要扩展
type Message struct {
	Sender  string `json:"sender"`
	Content string `json:"content"`
}

// ProcessRequest 用于接收前端传来的消息内容
type ProcessRequest struct {
	Content string `json:"content"`
}

// ProcessResponse 定义处理后的响应结构
type ProcessResponse struct {
	Content string `json:"content"`
}

func processHandler(w http.ResponseWriter, r *http.Request) {
	// 设置 CORS 头
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	// 处理预检请求
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// 接受 POST 请求
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// 解析请求体
	var req ProcessRequest
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&req); err != nil {
		http.Error(w, "Bad request"+err.Error(), http.StatusBadRequest)
		return
	}

	// 处理请求
	result := simulateCozeProcess(req.Content)

	// 构建响应
	resp := ProcessResponse{
		Content: result,
	}

	// 设置相应头并返回 JSON 响应
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}

}

// 调用 coze 的 API 进行处理
func simulateCozeProcess(input string) string {
	// 这里可以调用 coze 的 API 进行处理
	return "开发中: " + input
}

func main() {
	http.HandleFunc("/process", processHandler)

	// 启动 HTTP 服务器, 监听端口 56001
	log.Println("Starting server on port 56001")
	if err := http.ListenAndServe(":56001", nil); err != nil {
		log.Fatal("ListenAndServe error: ", err)
	}
}

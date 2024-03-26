package io

//请求参数

//注册参数
type ParamRegister struct {
	UserName string `json:"username"`
	PassWord string `json:"password"`
	IphoneID string `json:"iphoneID"`
}

//登录参数
type ParamLogin struct {
	UserID   int64  `json:"userID"`
	PassWord string `json:"password"`
	IphoneID string `json:"iphoneID"`
}

//修改个人信息参数
type ParamUpdate struct {
	UserName string `json:"username"`
	PassWord string `json:"password"`
	IphoneID string `json:"iphoneID"`
	Token    string `json:"token"`
}

//用户基本请求
type UserBaseReq struct {
	Token string `json:"token"`
}

//找回密码参数
type ParamForgetpwd struct {
	UserID   int64  `json:"userID"`
	IphoneID string `json:"iphoneID"`
}

//用户信息请求参数
type UserInfoReq struct {
	UserID   int64  `json:"userID"`
	UserName string `json:"userName"`
	Token    string `json:"token"`
}

//用户上传视频请求参数
type UserUpLoadVideoReq struct {
	Token string `json:"token"`

	VideoName string `json:"videoName"`
	VideoTags string `json:"videoTags"`
	VideoLink string `json:"videoLink"`
}

//用户点赞请求参数
type UserFavoriteReq struct {
	UserID   int64  `json:"userID"`
	UserName string `json:"userName"`
	Token    string `json:"token"`

	VideoID int64 `json:"videoID"`
}

//用户评论请求参数
type UserCommit struct {
	UserID   int64  `json:"userID"`
	UserName string `json:"userName"`
	Token    string `json:"token"`

	VideoID     int64  `json:"videoID"`
	CommentText string `gorm:"column:CommentText;comment:评论文本"`
}

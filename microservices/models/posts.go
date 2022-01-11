package models

import "time"

type Posts struct {
	Id          int       `gorm:"type:int;AUTO_INCREMENT;PRIMARY_KEY"`
	Title       string    `gorm:"type:varchar(200)"`
	Content     string    `gorm:"type:text"`
	Category    string    `gorm:"type:varchar(100)"`
	CreatedDate time.Time `gorm:"type:timestamp;DEFAULT:CURRENT_TIMESTAMP "`
	UpdatedDate time.Time `gorm:"type:timestamp;DEFAULT:CURRENT_TIMESTAMP "`
	Status      string    `gorm:"type:varchar(100)"`
}

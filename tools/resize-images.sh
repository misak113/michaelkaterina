#!/bin/bash

RESOLUTION=$1

if [ "$RESOLUTION" == "" ]; then
	echo "first argument has to be resolution: e.g.: 640x480"
	exit 1
fi

CURRENT_DIR_PATH=$(dirname $(readlink -f $0))
IMAGE_BASE_PATH="$CURRENT_DIR_PATH/../photos"
THUMB_BASE_PATH="$CURRENT_DIR_PATH/../thumbnails"

mkdir -p "$THUMB_BASE_PATH/$RESOLUTION"

for filename in `ls $IMAGE_BASE_PATH`; do
	echo "$filename"
	TARGET_PATH="$THUMB_BASE_PATH/$RESOLUTION/$filename"
	if [ ! -f "$TARGET_PATH" ]; then
		convert "$IMAGE_BASE_PATH/$filename" -resize $RESOLUTION\> "$TARGET_PATH"
	fi
done

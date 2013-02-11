#!/bin/bash

cp -R src src2
/bin/find src2 -name .svn -exec rm -Rf {} \;
rm -Rf src2/.idea
ncftpput -R -v -u $TETRIS_USERNAME -p $TETRIS_PASSWORD $TETRIS_HOSTNAME . src2
rm -Rf src2

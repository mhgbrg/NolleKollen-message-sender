# NolleKollen-message-sender

A simple script that allows you to send messages to the NolleKollen app programmatically.

## Usage

    casperjs send_message.js <username> <password> <path to message file>

If you want to schedule the sending of a message you can use the command `at` to schedule the execution of a bash script with the line
above.

## Background

At the time of writing this script the NolleKollen app didn't have any way of scheduling the sending of messages, and it didn't have any
API. I was tired of waking up early in the morning just to send a message, so I created this script in order to be able to schedule the
sending of the message the evening before instead.

## How it works

This script is uses CasperJS to simulate a user going to the NolleKollen website. It reads a message from a specified file, opens the
NolleKollen webpage, logs in, goes to the messaging page, inputs the message and clicks send.

**Disclaimer**: This script was written in the summer of 2015, and it is highly possible that the NolleKollen website has changed since
then. Feel free to fork this repo if you want to modify the script!

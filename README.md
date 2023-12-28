# MDCC

## Quickstart

Add attributes for the following elements:

| \<element\>                    	| attr name         	| attr value   	|
|--------------------------------	|-------------------	|--------------	|
| audio                          	| mvr-audio-element 	| audio        	|
| \<input type="range" value="0"\>  | mvr-audio-element    	| seek       	|
| hidden audio source               | mvr-audio-element    	| source       	|
| audio list wrapper                | mvr-audio-list     	| list        	|
| audio list item                   | mvr-audio-list     	| item        	|
| play/pause button              	| mvr-audio-trigger 	| click        	|
| play button (optionally hide)  	| mvr-audio-trigger 	| play-button  	|
| pause button (optionally hide) 	| mvr-audio-trigger 	| pause-button 	|
| duration text element          	| mvr-audio-time    	| duration     	|
| current time text element      	| mvr-audio-time    	| current-time 	|
| skip button                     	| mvr-audio-time    	| skip       	|
| rewind button                     | mvr-audio-time    	| rewind       	|

## Setup Notes

The hidden audio source is a hidden text element in each list item where the text content is updated to the url of the source audio. Not super elegant right now but somewhere to start.

If using optional play and pause buttons, give them combo classes of 'hide'.
'hide' Classes should set display to none.

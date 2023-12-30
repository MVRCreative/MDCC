# MDCC

## Quickstart

Add attributes for the following elements:

### Mover Attributes
| \<element\>                    	| attr name         	| attr value   	|
|--------------------------------	|-------------------	|--------------	|
| audio                          	| mvr-audio-element 	| audio        	|
| source (nested inside audio)     	| type                  | audio/mp3   	|
|                                 	| src                   |              	|
| input                             | mvr-audio-element    	| seek       	|
|                                   | type              	| range       	|
|                                   | value              	| 0          	|
| audio list wrapper (list)         | mvr-audio-element    	| list        	|
| play/pause button (div)         	| mvr-audio-trigger 	| click        	|
| play button (optionally hide)  	| mvr-audio-trigger 	| play-button  	|
| pause button (optionally hide) 	| mvr-audio-trigger 	| pause-button 	|
| duration text element (text)     	| mvr-audio-time    	| duration     	|
| current time text element (text) 	| mvr-audio-time    	| current-time 	|
| skip button                     	| mvr-audio-time    	| skip       	|
| rewind button                     | mvr-audio-time    	| rewind       	|
| bar title                         | mvr-audio-meta    	| title       	|
| bar speaker                       | mvr-audio-meta    	| speaker     	|
| bar artwork                       | mvr-audio-meta    	| artwork     	|

### Wized Attributes
| \<element\>                    	| attr name         	| attr value   	|
|--------------------------------	|-------------------	|--------------	|
| audio list item (div)            	| w-el                  | media_item   	|
| audio source (hidden text)        | w-el                  | media_source 	|
| audio id (hidden text)            | w-el                  | media_id      |
| audio art (hidden text)           | w-el                  | media_art 	|
| audio title (text)                | w-el                  | media_title 	|
| audio speaker (text)              | w-el                  | media_speaker	|

## Setup Notes

If using optional play and pause buttons, give them combo classes of 'hide'.
'hide' Classes should set display to none.

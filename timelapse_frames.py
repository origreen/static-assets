import os
import cv2
from tqdm import tqdm

def read_frames(path, downsampling):
    video, frames = cv2.VideoCapture(path), []
    success,frame = video.read()
    count = 0
    while(success):
        if count % downsampling == 0:
            frames.append(frame[:640,:,:])
        count += 1
        success, frame = video.read()
    print(f"Extracting {len(frames)} out of {count} frames.")
    return frames

def extract_frames(path, frames):
    for i, f in tqdm(enumerate(frames)):
        cv2.imwrite(os.path.join(path, str(i).rjust(4, '0')+".jpg"), f)

# Path to directory where to save the frames
save = '/home/emili/Documents/Universitat/TUM/Hackathon/frames'
# Path to video 
path = 'cabbage.mp4'

frames = read_frames(path, 107)
extract_frames(save, frames)

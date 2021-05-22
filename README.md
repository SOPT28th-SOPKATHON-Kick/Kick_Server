# Kick_Server
```서비스명``` : ㅋick

```서비스 한 줄 소개``` : 밤에 누워서 생각나는 이불킥하고 싶은 순간을 유머스럽게 공유하는 커뮤니티형 플랫폼

</br>

### Models

- /models/Post.ts

  ``` javascript
  import mongoose from "mongoose"
  import { IPost } from "../interfaces/IPost"
  
  
  const PostSchema = new mongoose.Schema({
  
   _id:{
    type: mongoose.SchemaTypes.ObjectId,
   },
  
   kick_count:{
    type: Number,
    require: true,
   },
  
   timestamp:{
    type: Date,
    require: true,
   },
  
   contents:{
    type: String,
    require: true,
   },
  
   title: {
    type: String,
    require: true,
   },
  });
  
  
  export default mongoose.model<IPost & mongoose.Document>(
   "Post",
   PostSchema
  );
  ```

  

- interfaces/IPost.ts

  ```javascript
  import mongoose from "mongoose";
  
  
  
  export interface IPost {
   _id: mongoose.Types.ObjectId;
   kick_count: Number;
   timestamp: Date;
   contents: String;
   title: String;
  }
  ```

  

  

  ### [API 명세서](https://github.com/SOPT28th-SOPKATHON-Kick/Kick_Server/wiki)

![image](https://user-images.githubusercontent.com/62228195/119237662-f2dd6f80-bb78-11eb-9e1a-7f47bd92c137.png)


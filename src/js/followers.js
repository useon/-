//팔로워 리스트 들고 오기
async function getFollowerData() {
    const token = localStorage.getItem('Token');
    const accountName = localStorage.getItem('Accountname');
    //나의 팔로우 리스트
    const followingRes = await fetch(
        `http://146.56.183.55:5050/profile/${accountName}/following`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        }
        );
        //내가 팔로우 한 유저의 id를 담음
        const followingjson = await followingRes.json();
        const followingIdArray = [];
        followingjson.map((following) => {
            followingIdArray.push(following._id);
        })
        
        //나의 팔로워 리스트
        const followerRes = await fetch(
            `http://146.56.183.55:5050/profile/${accountName}/follower`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
            }
            );
            
            const followerjson = await followerRes.json();
            // console.log(followerjson);
            followerjson.map((follower) => {
                const followerId = follower._id;
                const userName = follower.username;
                const intro = follower.intro;
                const image = follower.image;
                const followerAccountName = follower.accountname;
                
                
                document.querySelector('.list-followers').innerHTML += `
                <li>
                <a href="" class="cont_user">
                <img src="${image}"  class="img_profile" />
                <div>
                <strong>${userName}</strong>
                <small class="txt_preview txt_ellipsis">${intro}</small>
                </div>
                </a>
                <button id="${followerAccountName}" class="btn-follow" ></button>
                </li>
                `;

                // 맞팔 유무 띄워주기
                const followFlag = followingIdArray.find(x => x === followerId);
                console.log(!!followFlag); //true랑 false로 나옴
                const followBtn = document.getElementById(followerAccountName)
                console.log(followBtn)
                if(!!followFlag) {
                    followBtn.classList.add('following');
                    followBtn.textContent = '취소';
                } else {
                    followBtn.textContent = '팔로우';
                }
            });
            
            //팔로우, 언팔로우 기능
            const followBtns = document.querySelectorAll('.btn-follow');
            for (const followBtn of followBtns) {
                //follow버튼을 클릭했을 때,
                followBtn.addEventListener('click', () => {
            const accountName = followBtn.getAttribute('id');

            //following 중이라면
            if (followBtn.classList.contains('following')) {
                //언팔로우
                async function UnFollow() {
                    const token = localStorage.getItem('Token');
                    const res = await fetch(
                        `http://146.56.183.55:5050/profile/${accountName}/unfollow`,
                        {
                            method: 'DELETE',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-type': 'application/json',
                            },
                        }
                    );
                    const json = await res.json();
                    console.log(json);
                    followBtn.textContent = '팔로우';
                }
                UnFollow();
                //following 중이 아니라면
            } else {
                //팔로우
                async function Follow() {
                    const token = localStorage.getItem('Token');
                    const res = await fetch(
                        `http://146.56.183.55:5050/profile/${accountName}/follow`,
                        {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-type': 'application/json',
                            },
                        }
                    );
                    const json = await res.json();
                    console.log(json);
                    // followBtn.classList.add('following');
                    followBtn.textContent = '취소';
                }
                Follow();
            }
            followBtn.classList.toggle('following');
        });
    }
}
getFollowerData();

# bilibili-live-effective-rate Changelog

(Frome new to old)

## 0.3.0

The bilibili live data is changed from <https://link.bilibili.com/p/center/index#/data/overview> to <https://link.bilibili.com/p/center/index#/live-data/session-data>. A lot of things have changed. The v0.2.x branch works no more.

Notice the 0.3.0 version is still using **MutationObserver** which is not necessary any more, but I'm lazy to get rid of them.

The detail tab is removed from bilibili so will no longer work there.

Otherwise, there isn't much changed to talk about.

## 0.2.1

- Add unit 'second' to avoid some problems.

## 0.2.0

I think what I can do is done for now. There would be no more feature update.

- Removed unnecessary meta(greasyfork.org request)
- Update Url Checking
- Change color pattern

### About these:

#### Well for the second one

Sometimes, the url becomes to `https://link.bilibili.com/p/center/index?visit_id=40utwbkde8u8#/data/overview`. I have no idea when or why there is a get_param there, but it would break the old way of url matching checking.

#### The third one

Streamer watching is also counted as effective-watching-time, so the color pattern is changed to this:

- when the effectiveRate < 50, color = 'darkgreen'.
- when the 50 <= effectiveRate < 100, color = 'green'. (It means you have not a single person watched your live-streaming, including yourself)
- when the 100 <= effectiveRate < 150, color = 'darkgoldenrod'.
- when the 150 <= effectiveRate < 200, color = 'orange'. (It means you have not a single person watched your live-streaming, excluding yourself)
- when the effectiveRate >= 200, color = 'red'. (It means you have more than a single person watched your live-streaming, excluding yourself. Congratulation.)

## 0.1.0

- **Add popup-panel support**
- Make unitConverter functional
- Make colorRate functional
- Clean code

## 0.0.1

First release.

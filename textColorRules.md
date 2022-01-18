# textColorRules

Streamer watching is also counted as effective-watching-time, so the color pattern is changed to this:

- when the effectiveRate < 50, color = 'darkgreen'.
- when the 50 <= effectiveRate < 100, color = 'green'. (It means you have not a single person watched your live-streaming, including yourself)
- when the 100 <= effectiveRate < 150, color = 'darkgoldenrod'.
- when the 150 <= effectiveRate < 200, color = 'orange'. (It means you have not a single person watched your live-streaming, excluding yourself)
- when the effectiveRate >= 200, color = 'red'. (It means you have more than a single person watched your live-streaming, excluding yourself. Congratulation.)

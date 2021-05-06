currentTimeStr1 = CStr(Year(Now()))&"-"&Right("0"&Month(Now()),2)&"-"&Right("0"&Day(Now()),2)&" "&Right("0"&Hour(Now()),2)&":"&Right("0"&Minute(Now()),2)&":"&Right("0"&Minute(Now()),2)
currentTimeStr2 = CStr(Year(Now()))&"-"&Right("0"&Month(Now()),2)&"-"&Right("0"&Day(Now()),2)
 
WScript.Echo currentTimeStr1 '2019-04-11 15:57:57
WScript.Echo currentTimeStr2 '2019-04-11
 
'格式化时间方法 n_Flag(1-5)
WScript.Echo Format_Time(Now(),5)
 
Function Format_Time(s_Time, n_Flag)
    Dim y, m, d, h, mi, s
    Format_Time = ""
    If IsDate(s_Time) = False Then Exit Function
    y = cstr(year(s_Time))
    m = cstr(month(s_Time))
    If len(m) = 1 Then m = "0" & m
    d = cstr(day(s_Time))
    If len(d) = 1 Then d = "0" & d
    h = cstr(hour(s_Time))
    If len(h) = 1 Then h = "0" & h
    mi = cstr(minute(s_Time))
    If len(mi) = 1 Then mi = "0" & mi
    s = cstr(second(s_Time))
    If len(s) = 1 Then s = "0" & s
    Select Case n_Flag
        Case 1
            ' yyyy-mm-dd hh:mm:ss
            Format_Time = y & "-" & m & "-" & d & " "& h &":" & mi &":" & s
        Case 2
            ' yyyy-mm-dd
            Format_Time = y & "-" & m & "-" & d
        Case 3
            ' hh:mm:ss
            Format_Time = h & ":" & mi & ":" & s
        Case 4
            ' yyyy年mm月dd日
            Format_Time = y & "年" & m & "月" & d & "日"
        Case 5
            ' yyyymmdd
            Format_Time = y & m & d
    End Select
End Function
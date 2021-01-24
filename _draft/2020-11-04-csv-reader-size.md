```
csvFile, err := os.Open(csvPath)
r := csv.NewReader(bufio.NewReaderSize(csvFile, 10000))
```


```
panic: runtime error: slice bounds out of range [:7887] with capacity 4096

goroutine 82 [running]:
bufio.(*Reader).ReadSlice(0xc0000c2ea0, 0x105930a, 0x88, 0x90, 0xc00090cab0, 0x0, 0x0)
        /usr/local/Cellar/go/1.13.3/libexec/src/bufio/bufio.go:334 +0x232
encoding/csv.(*Reader).readLine(0xc00015c1b0, 0x9, 0x9, 0xc00090cab0, 0xc00090f680, 0x20e)
        /usr/local/Cellar/go/1.13.3/libexec/src/encoding/csv/reader.go:218 +0x49
encoding/csv.(*Reader).readRecord(0xc00015c1b0, 0x0, 0x0, 0x0, 0xc00090cab0, 0x9, 0x9, 0x0, 0x0)
        /usr/local/Cellar/go/1.13.3/libexec/src/encoding/csv/reader.go:266 +0x115
encoding/csv.(*Reader).ReadAll(0xc00015c1b0, 0xc0005af2c0, 0x1000, 0xc0006fc000, 0xc0001da608, 0x0)
        /usr/local/Cellar/go/1.13.3/libexec/src/encoding/csv/reader.go:202 +0x74
main.savePending(0xc00015c1b0, 0x0, 0x0, 0x0)
```
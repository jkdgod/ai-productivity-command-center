import { useMemo, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

type Task = { id: string; title: string; urgency: number; impact: number; alignment: number; effortHours: number }
const seed: Task[] = [
  { id: '1', title: 'Finish project proposal', urgency: 5, impact: 5, alignment: 5, effortHours: 2 },
  { id: '2', title: 'Tailor resume', urgency: 4, impact: 5, alignment: 5, effortHours: 1.5 },
  { id: '3', title: 'Schedule grocery pickup', urgency: 4, impact: 3, alignment: 4, effortHours: .25 },
]
const score = (task: Task) => Math.round((task.urgency * 8 + task.impact * 7 + task.alignment * 4 + Math.max(0, 6 - task.effortHours) * 2.5) * 10) / 10

export default function Today() {
  const [tasks, setTasks] = useState(seed)
  const [title, setTitle] = useState('')
  const ranked = useMemo(() => [...tasks].sort((a, b) => score(b) - score(a)), [tasks])
  const add = () => { const value = title.trim(); if (!value) return; setTasks((items) => [...items, { id: String(Date.now()), title: value, urgency: 3, impact: 3, alignment: 3, effortHours: 1 }]); setTitle('') }
  return <SafeAreaView style={styles.page}><ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.eyebrow}>LOCAL-FIRST DAILY PLANNER</Text><Text style={styles.title}>Today</Text><Text style={styles.copy}>Capture the next action. Your tasks remain on this device in the starter app.</Text>
    <View style={styles.card}><Text style={styles.heading}>Quick capture</Text><View style={styles.row}><TextInput value={title} onChangeText={setTitle} placeholder="Add a task..." placeholderTextColor="#8ea2bd" style={styles.input}/><Pressable onPress={add} style={styles.add}><Text style={styles.addText}>Add</Text></Pressable></View></View>
    <View style={styles.card}><Text style={styles.heading}>Top priorities</Text>{ranked.map((task, index) => <View key={task.id} style={styles.task}><View style={styles.rank}><Text style={styles.rankText}>{index + 1}</Text></View><View style={styles.taskBody}><Text style={styles.taskTitle}>{task.title}</Text><Text style={styles.meta}>Score {score(task)} · {task.effortHours}h estimate</Text></View><Pressable onPress={() => setTasks((items) => items.filter((item) => item.id !== task.id))}><Text style={styles.done}>Done</Text></Pressable></View>)}</View>
    <Text style={styles.footer}>AI connections for ChatGPT, Claude, and Gemini should be opt-in and use user-owned keys only.</Text>
  </ScrollView></SafeAreaView>
}
const styles = StyleSheet.create({ page:{flex:1,backgroundColor:'#07111f'},content:{padding:20,gap:16},eyebrow:{color:'#7dd3fc',fontWeight:'800',fontSize:12,letterSpacing:1.3},title:{color:'#eaf1ff',fontSize:42,fontWeight:'800'},copy:{color:'#aabbd1',fontSize:16,lineHeight:23},card:{backgroundColor:'#10223c',borderWidth:1,borderColor:'#25446d',borderRadius:16,padding:16},heading:{color:'#eaf1ff',fontWeight:'800',fontSize:18,marginBottom:12},row:{flexDirection:'row',gap:8},input:{flex:1,backgroundColor:'#07111f',color:'#eaf1ff',borderRadius:10,padding:12,borderWidth:1,borderColor:'#3d5b83'},add:{backgroundColor:'#38bdf8',paddingHorizontal:14,justifyContent:'center',borderRadius:10},addText:{fontWeight:'800',color:'#06111d'},task:{flexDirection:'row',alignItems:'center',gap:10,paddingVertical:12,borderBottomWidth:1,borderColor:'#25446d'},rank:{width:28,height:28,borderRadius:14,backgroundColor:'#38bdf8',alignItems:'center',justifyContent:'center'},rankText:{fontWeight:'900',color:'#06111d'},taskBody:{flex:1},taskTitle:{color:'#eaf1ff',fontWeight:'700',fontSize:16},meta:{color:'#aabbd1',marginTop:4},done:{color:'#7dd3fc',fontWeight:'800'},footer:{color:'#8ea2bd',lineHeight:20,paddingVertical:8} })
